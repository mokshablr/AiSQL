import React, { useEffect, useState } from "react";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
interface UpdateUserDialogProps {
  initialIsOpen: boolean;
  onClose: () => void;
  selectedUserId: string;
  initialData: User;
  onUpdate: (id: string, role?: UserRole) => Promise<void>;
}

export default function UpdateUserDialog({
  initialIsOpen,
  onClose,
  selectedUserId,
  initialData,
  onUpdate,
}: UpdateUserDialogProps) {
  const name = initialData.name;
  const [role, setRole] = useState<UserRole>(initialData.role);
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    setRole(initialData.role);
    setIsOpen(initialIsOpen);
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!selectedUserId) {
        toast.error("Could not find specfied user details");
      } else {
        await onUpdate(selectedUserId, role);
        setIsOpen(false);
        onClose();
      }
    } catch (error) {
      toast.error("Error updating User: " + error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update user role:</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center">
              <div className="pb-3">
                <Label htmlFor="name" className="text-md text-left">
                  Change <b>{name}</b>'s role
                </Label>
              </div>
              <div>
                <Select
                  value={role}
                  onValueChange={(value: UserRole) => setRole(value)}
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="STAFF">STAFF</SelectItem>
                    <SelectItem value="STUDENT">STUDENT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
