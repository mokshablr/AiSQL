import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      { href: "/", icon: "home", title: "home" },
      { href: "/query", icon: "mail", title: "Query" },
      { href: "/api-keys", icon: "lock", title: "Tenent" },
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
