"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart,
  Code,
  Database,
  MessageSquare,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/shared/icons";

// Define the type of each row in the JSON data
interface QueryResultRow {
  "Column 1": string;
  "Column 2": string;
  "Column 3": string;
}

// Sample JSON data with the defined type
const sampleData: QueryResultRow[] = [
  { "Column 1": "data 1", "Column 2": "Data 2", "Column 3": "Data 3" },
  { "Column 1": "Data 4", "Column 2": "Data 5", "Column 3": "Data 6" },
];

// Example authentication check function
function checkIfUserSignedIn() {
  // Replace with actual authentication check logic
  return false;
}

export default function AIDataPage() {
  // Set the type of queryResult to QueryResultRow[]
  const [queryResult, setQueryResult] = useState<QueryResultRow[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Set authentication status when component mounts
    setIsSignedIn(checkIfUserSignedIn());
  }, []);

  useEffect(() => {
    // Load query results; replace sampleData with actual data-fetching logic
    setQueryResult(sampleData);
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-44">
          <video
            autoPlay
            muted
            loop
            className="absolute left-0 top-[-200px] z-[-1] h-full object-cover sm:block"
          >
            <source src="/world.webm" type="video/webm" />
          </video>
          <div className="container px-4 pt-32 sm:pt-28 md:px-6 md:pt-20 lg:pt-14 xl:pt-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Talk to Your Data
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Transform your queries into SQL results seamlessly with our
                  AI-powered database interface.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                {isSignedIn ? (
                  <>
                    <Input
                      className="text-md w-full font-semibold placeholder-gray-400"
                      placeholder="Ask your database a question..."
                    />
                    <Button size="lg" className="text-md w-full font-semibold">
                      Submit Query
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your data insights in seconds. No SQL required.
                    </p>
                  </>
                ) : (
                  <Button
                    size="lg"
                    className="text-md w-full font-semibold"
                    onClick={() => {
                      window.location.href = "/login"; // Update to your sign-in route
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-zinc-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Database className="h-10 w-10 text-purple-600" />
                <h2 className="text-xl font-bold">Direct Database Access</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect directly to your database and get results instantly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Terminal className="h-10 w-10 text-purple-600" />
                <h2 className="text-xl font-bold">Natural Language Queries</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Use plain English to ask complex queries. Our AI does the
                  rest.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <BarChart className="h-10 w-10 text-purple-600" />
                <h2 className="text-xl font-bold">Real-Time Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  See real-time insights and monitor your data effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Layout */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Interactive Query Console
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Chat with your data directly. Your query, our response.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-8">
              {/* Chat message layout */}
              <div className="rounded-lg bg-gray-100 p-4 shadow-lg dark:bg-zinc-700">
                <MessageSquare className="mr-2 inline h-5 w-5 text-purple-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  What’s the total revenue for Q3?
                </span>
              </div>
              <div className="rounded-lg bg-purple-100 p-4 shadow-lg dark:bg-purple-800">
                <MessageSquare className="mr-2 inline h-5 w-5 text-purple-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Total revenue for Q3: $1,200,000.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Output Table */}
        {/* Query Results Section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-zinc-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Query Results
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                View and analyze data directly from your query output.
              </p>
            </div>
            <div className="mx-auto max-w-5xl overflow-x-auto py-8">
              {queryResult.length > 0 ? (
                <table className="w-full table-auto border-collapse border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                  <thead>
                    <tr className="bg-gray-100 text-left dark:bg-zinc-800">
                      {/* Generate table headers from keys */}
                      {Object.keys(queryResult[0]).map((key) => (
                        <th
                          key={key}
                          className="border border-gray-200 px-4 py-2 dark:border-zinc-700"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Generate table rows */}
                    {queryResult.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, idx) => (
                          <td
                            key={idx}
                            className="border border-gray-200 px-4 py-2 dark:border-zinc-700"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No data to display.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <Image
          alt="AI Database Logo"
          src="/ai-database-logo.png"
          width={90}
          height={31}
          className="block dark:hidden"
        />
        <Image
          alt="AI Database Logo"
          src="/ai-database-logo-dark.png"
          width={90}
          height={31}
          className="hidden dark:block"
        />
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="inline-flex items-center text-xs underline-offset-4 hover:underline"
            href="https://www.google.com/search?q=your+mom&oq=your+mom&gs_lcrp=EgZjaHJvbWUqDQgAEAAY4wIYsQMYgAQyDQgAEAAY4wIYsQMYgAQyCggBEC4YsQMYgAQyBwgCEC4YgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEC4YgAQyBwgIEAAYgAQyBwgJEAAYgATSAQkxMDE1MGowajSoAgiwAgE&sourceid=chrome&ie=UTF-8"
          >
            <Icons.google className="mr-1 h-4 w-4" />
            click
          </Link>
        </nav>
      </footer>
    </div>
  );
}
