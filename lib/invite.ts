"use server";

import { prisma } from "./db";
import { getCurrentUser } from "./session";

type Tenant = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const findTenant = async (tenantID) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const tenant = await prisma.$queryRaw<Tenant[]>`
        SELECT * FROM tenants WHERE id = ${tenantID}
      `;

    if (tenant.length === 0) {
      throw new Error("Organisation not found");
    }

    return tenant;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

type JoinOrganisationResponse = {
  count: number; // or any other expected structure of the response
};

type ErrorResponse = {
  error: string;
};
export const joinOrganisation = async (
  tenantID: string,
): Promise<JoinOrganisationResponse | ErrorResponse> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const user_id = user.id;
    const response = await prisma.$executeRaw`
        UPDATE users 
        SET tenant_id = ${tenantID}, role='STUDENT'
        WHERE id = ${user_id}
      `;

    // Check if the update was successful
    if (response === 0) {
      throw new Error("Update failed, no rows affected");
    }

    return { count: response };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message };
  }
};
