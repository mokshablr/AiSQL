"use server";

import { ApiKey } from "@prisma/client";

import { prisma } from "@/lib/db";

export const newEmail = async (
  token: ApiKey,
  from: String,
  to: String,
  subject: String,
  html?: String,
  text?: String,
) => {
  try {
    if (!text && ) {
      const newEmail = await prisma.emails.create({
        data: {
          apiKey: token,
          from: from,
          to: to,
          subject: subject,
          html_body: html,
        },
      });
      return newEmail;
    } else if (!)
  } catch (error) {}
};
