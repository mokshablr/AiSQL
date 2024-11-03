import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const metadata = constructMetadata({
  title: "Dashboard",
  description: "Sales pipeline dashboard",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  if (!user.isActive) {
    redirect("/inactive");
  }
  return (
    <>
      <div>
        <Input />
      </div>
    </>
  );
}
