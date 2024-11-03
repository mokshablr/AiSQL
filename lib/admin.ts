"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

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
    await prisma.$queryRaw`UPDATE users SET role=${updateRole} WHERE id=${userId}`;
    const updatedUsers = await getAllUsers();
    return updatedUsers;
  } catch (error) {
    throw new Error(error);
  }
};
