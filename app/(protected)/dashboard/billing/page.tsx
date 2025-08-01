import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/dashboard/header";
import { Icons } from "@/components/shared/icons";

export const metadata = constructMetadata({
  title: "Billing – SaaS Starter",
  description: "Manage billing and your subscription plan.",
});

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (user && user.id && user.role === "USER") {
    // The following lines were removed as per the edit hint:
    // let userSubscriptionPlan = await getUserSubscriptionPlan(user.id);
    // return (
    //   <>
    //     <DashboardHeader
    //       heading="Billing"
    //       text="Manage billing and your subscription plan."
    //     />
    //     <div className="grid gap-8">
    //       <Alert className="!pl-14">
    //         <Icons.warning />
    //         <AlertTitle>This is a demo app.</AlertTitle>
    //         <AlertDescription className="text-balance">
    //           SaaS Starter app is a demo app using a Stripe test environment. You
    //           can find a list of test card numbers on the{" "}
    //           <a
    //             href="https://stripe.com/docs/testing#cards"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font-medium underline underline-offset-8"
    //           >
    //             Stripe docs
    //           </a>
    //           .
    //         </AlertDescription>
    //       </Alert>
    //       <BillingInfo userSubscriptionPlan={userSubscriptionPlan} />
    //     </div>
    //   </>
    // );
  } else {
    redirect("/login");
  }

  return (
    <>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription className="text-balance">
            SaaS Starter app is a demo app using a Stripe test environment. You
            can find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        {/* The BillingInfo component was removed as per the edit hint. */}
      </div>
    </>
  );
}
