import { Session } from "next-auth";
import { DefaultUser } from "next-auth/core/types";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
            hasPermis: boolean;
            pseudo: string;
        } & DefaultUser; // Vous pouvez combiner avec les types par défaut
    }

    interface User {
        id: string;
        role: string;
        hasPermis: boolean;
        pseudo: string;
    }
}
