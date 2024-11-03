"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import cuid from "cuid";

import { prisma } from "@/lib/db";
// import { sendInviteEmail } from "@/lib/email";
import { getCurrentUser } from "@/lib/session";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const getUserById = async (id: string) => {
  try {
    // const user = await prisma.user.findUnique({ where: { id } });
    const user = await prisma.$queryRaw`SELECT * FROM users WHERE id=${id}`;
    return user;
  } catch {
    return null;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (user.role != "ADMIN") {
      throw new Error("You are not an admin.");
    }
    const tenant_id = user.tenant_id;
    const userList: User[] =
      await prisma.$queryRaw`SELECT * FROM users WHERE tenant_id=${tenant_id}`;
    return userList;
  } catch {
    return [];
  }
};

export const getTenantID = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return user.tenant_id;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserRole = async (userId: string, updateRole: UserRole) => {
  try {
    // Use a parameterized query to safely set the role
    const response = await prisma.$executeRaw`
      UPDATE users SET role = ${updateRole}::"UserRole" WHERE id = ${userId}
    `;

    // Optionally check if any rows were affected
    if (response === 0) {
      throw new Error(
        "No user found with the provided ID or role update failed.",
      );
    }

    // Get the updated list of users after the role change
    const updatedUsers = await getAllUsers();
    return updatedUsers;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error(
      `Failed to update user role: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
export const removeUser = async (userID: string) => {
  try {
    // Generate a new CUID for tenant_id
    const newTenantId = cuid(); // Replace with your CUID generation method if different

    // Use a raw query to update the user's tenant_id
    const response = await prisma.$executeRaw`
      UPDATE users 
      SET tenant_id = ${newTenantId}, role='ADMIN'::"UserRole"
      WHERE id = ${userID}
    `;

    // Optionally check if any rows were affected
    if (response === 0) {
      throw new Error(
        "No user found with the provided ID or tenant ID update failed.",
      );
    }

    return { userId: userID, newTenantId }; // Return updated information as needed
  } catch (error) {
    console.error("Error updating user's tenant_id:", error);
    throw new Error(
      `Failed to update user's tenant_id: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
