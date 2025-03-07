"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

// Updated interface to allow nullable values where necessary
interface LoggedUser {
    id: string;
    clerkUserId: string;
    name: string | null;
    imageUrl: string | null;
    email: string;
}

export const checkUser = async (): Promise<LoggedUser | null> => {
    try {
        const user = await currentUser();

        if (!user) {
            console.error("No authenticated user found");
            return null;
        }

        // Fetch existing user from the database
        let loggedUser = await db.user.findUnique({
            where: { clerkUserId: user.id },
        });

        if (loggedUser) {
            console.log("User already exists:", loggedUser);
            return loggedUser;
        }

        // Extract user details safely
        const name =
            user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.firstName || user.lastName || null;

        // Create user in the database
        loggedUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl || null,
                email: user.emailAddresses?.[0]?.emailAddress || ""
            },
        });

        console.log("New user created:", loggedUser);
        return loggedUser;
    } catch (error: any) {
        console.error("Error during user login:", error);
        throw new Error("Failed to Login: " + error.message);
    }
};
