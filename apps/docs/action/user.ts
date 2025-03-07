"use server";


import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";
import { db } from "lib/prisma";

interface UpdateUserData {
  industry: string;
  experience: string;
  bio: string;
  skills: string[];
}

interface User {
  id: string;
  clerkUserId: string;
  industry?: string;
}

export async function updateUser(data: UpdateUserData): Promise<User> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx:any) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error: any) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus(): Promise<{ isOnboarded: boolean }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const userData = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!userData?.industry,
    };
  } catch (error: any) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}