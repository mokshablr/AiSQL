// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { AiChat, queryOllamaModel } from "@/lib/ai-query";
// import { Button } from "@/components/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Icons } from "@/components/shared/icons";

// export default function Emails() {
//   // Example usage
//   queryOllamaModel("What is the capital of France?")
//     .then((response) => {
//       console.log("Model response:", response);
//     })
//     .catch((error) => {
//       console.error("Error querying model:", error.message);
//     });

//   return (
//     <>
//       <title>Talk to your Data</title>
//       <div>
//         <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
//           Query your database
//         </h1>
//       </div>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import { chatWithOllama, queryNeonDB } from "@/lib/ai-functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OllamaResponse = {
  summary: string;
  query: string;
};

type NeonResponseItem = {
  lettergrade: string;
  numericgrade: number;
};

const QueryPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState(
    "This is a summary of the AI's intent.",
  );
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT * FROM grades WHERE lettergrade = 'A';",
  );

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Sample data for demonstration purposes; replace with actual API response handling
    setResponse("Sample Response"); // Replace with actual response text
    setResults([{ lettergrade: "A", numericgrade: 8, hello: "aah" }]); // Sample data for demonstration
    setSummary("This is a summary of the AI's intent."); // Sample summary text
    setSqlQuery("SELECT * FROM grades WHERE lettergrade = 'A';"); // Sample SQL query text
  };

  return (
    <div className="flex min-h-screen flex-col items-center text-white">
      <main className="w-full max-w-3xl flex-1 px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="container mx-auto">
          {!response && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="typing-animation text-3xl font-bold sm:text-4xl md:text-5xl">
                Query Your Database...
              </h1>
              <p className="text-gray-400 md:text-xl">
                Enter your query below and receive instant results from the
                database.
              </p>
            </div>
          )}

          {response && (
            <div className="text-center">
              {/* AI Summary and SQL Query Display */}
              <div className="mb-6 mt-8 rounded-lg bg-gray-800 p-4 shadow-md">
                <h2 className="text-lg font-bold text-blue-400">AI Summary:</h2>
                <p className="mb-2 text-gray-300">{summary}</p>
                <h3 className="text-lg font-bold text-blue-400">SQL Query:</h3>
                <pre className="overflow-auto rounded bg-gray-900 p-3 text-gray-100">
                  {sqlQuery}
                </pre>
              </div>

              {/* Results Table */}
              <h2 className="mb-4 text-2xl font-bold">Results</h2>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    {Object.keys(results[0] || {}).map((header, index) => (
                      <th
                        key={index}
                        className="border-b border-gray-600 px-4 py-2 text-gray-400"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-b border-gray-600 px-4 py-2"
                        >
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-lg">{response}</p>
            </div>
          )}
        </div>
      </main>

      {/* Input form at the bottom */}
      <div className="fixed bottom-0 w-full max-w-3xl px-4 py-4">
        <form
          onSubmit={handleQuerySubmit}
          className="flex w-full items-center space-x-2"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            className="w-full rounded-lg px-4 py-2 font-semibold text-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueryPage;
