import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                pseudo: { label: "Pseudo", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.pseudo || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await axios.post('http://localhost:8080/api/auth/login', {
                        pseudo: credentials.pseudo,
                        password: credentials.password
                    });

                    if (response.data && response.data.user) {
                        return response.data.user;
                    }
                    return null;
                } catch (error) {
                    console.error('Erreur d\'authentification:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.hasPermis = user.hasPermis
                token.pseudo = user.pseudo// Ajoutez d'autres propriétés si nécessaire
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.hasPermis = token.hasPermis
                session.user.pseudo = token.pseudo// Ajoutez d'autres propriétés si nécessaire
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login', // Page de connexion personnalisée
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };