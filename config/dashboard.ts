import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "/dashboard", icon: "messages", title: "Join Org" },
      { href: "/query", icon: "mail", title: "Query" },
    ],
  },
  {
    title: "SETUP",
    items: [
      {
        href: "/users",
        icon: "user",
        title: "Users",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/settings", icon: "settings", title: "Settings" },
    ],
  },
];
