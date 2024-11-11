import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await axios.post('http://localhost:8080/api/auth/login', {
                        email: credentials.email,
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
                token.id = user.id; // Ajoutez d'autres propriétés si nécessaire
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; // Ajoutez d'autres propriétés si nécessaire
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