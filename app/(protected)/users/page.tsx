"use client";

import { useEffect, useState } from "react";

import { getServersByTenant } from "@/lib/smtp-config";
import { DataTable } from "@/components/ui/data-table"; // Make sure to import your DataTable component

import AddUserDialog from "./add-user-dialog";
import MailServerTable from "./users-table";
import UserTable from "./users-table";

// type SmtpConfig = {
//   id: string;
//   name: string;
//   host: string;
//   port: number;
//   user: string;
//   security: string;
// };

export default function MailServers() {
  // const [data, setData] = useState<SmtpConfig[]>([]);
  // const [columns, setColumns] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchMailServers = async () => {
  //   try {
  //     const result = await getServersByTenant();
  //     // console.log("result", result); // Fixed log statement
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching servers:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMailServers(); // Fetch initial data on mount
  // }, []);

  return (
    <>
      <title>Users Management</title>
      <div>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Manage Users
          </h1>
          <div>
            <AddUserDialog />
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          {/* <MailServerTable
            initialMailServers={data}
            initialIsLoading={isLoading}
          /> */}
          <UserTable />
        </div>
      </div>
    </>
  );
}
