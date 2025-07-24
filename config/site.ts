import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "AiSQL",
  description:
    "AiSQL lets you chat with your database using natural language. Instantly generate SQL, get insights, and manage your data with AI-powered ease.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "",
    github: "https://github.com/your-org/aisql", // Update to your actual repo
  },
  mailSupport: "",
};
