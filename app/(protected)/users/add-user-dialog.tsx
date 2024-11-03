"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTenantID } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [tenantId, setTenantId] = useState<string>();

  useEffect(() => {
    const fetchInviteID = async () => {
      try {
        const tenant_id = await getTenantID();
        setTenantId(tenant_id);
      } catch (error) {
        toast.error("Error fetching mail servers: " + error.message);
      }
    };

    fetchInviteID();
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Invite users</Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite users</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center">
              <div>
                <Label htmlFor="name" className="text-left">
                  Your organisation's unique ID:
                </Label>
                <Input
                  readOnly
                  value={tenantId}
                  className="bg-secondary text-muted-foreground focus:outline-none"
                />
              </div>
              <div className="pt-3 text-center text-sm">
                Share this ID with the person you want to invite.
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
