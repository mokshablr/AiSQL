"use client";

import { useState } from "react";
import { toast } from "sonner";

import { findTenant, joinOrganisation } from "@/lib/invite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardPage() {
  const [token, setToken] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const result = await findTenant(token);
    if ("error" in result) {
      toast.error(`Error: ${result.error}`);
    } else {
      const join = await joinOrganisation(token);
      if ("error" in join) {
        toast.error(`Error: ${join.error}`);
      } else {
        toast.success("Organisation joined!");
        console.log(join);
      }
    }
  }

  return (
    <>
      <title>Join an organisation!</title>
      <div>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Join an organisation!
          </h1>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <Label>Invite token</Label>
          <div>
            <form onSubmit={onSubmit} className="flex gap-5 pt-4">
              <Input
                className="max-w-[300px]"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
