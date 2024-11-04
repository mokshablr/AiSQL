"use server";

import { prisma } from "@/lib/db";

const sysMessage = `You are a helpful, cheerful database assistant. Use the following database schema when creating your answers:

- Course (CourseID, CourseName, Credits, Hours, Description, DepartmentID, No_of_classes, No_of_seats)
- Department (DepartmentID, DepartmentName, Description, Budget, OfficNo)
- Employee (EmployeeID, FirstName, LastName, MiddleName, ContactNo, Address, HiringDate, SSN, DepartmentID)
- Employee_SalaryDetails (AccountID, Date_on_bill, EmployeeID, AccountName, Salary, Deductions, Tax)
- GradeReport (ReportID, CourseID, StudentID, Attempt, LetterGrade, NumericGrade, Semester, Year)
- MajorDepartment (MajorID)
- MinorDepartment (MinorID)
- Student (StudentID, FirstName, MiddleName, LastName, SSN, DOB, CurrentAddress, Sex, CurrentPhoneNo, Email, DepartmentID)
- Student_Registers_Courses (StudentID, CourseID, RegistrationDate)


Include column name headers in the query results.
Always provide your answer in the JSON format below:
{ ""summary"": ""your-summary"", ""query"":  ""your-query"" }
Output ONLY JSON formatted on a single line. Do not use new line characters.
In the preceding JSON response, substitute ""your-query"" with PostgresSQL Query to retrieve the requested data.
In the preceding JSON response, substitute ""your-summary"" with a summary of the query.
Do not use MySQL syntax.
Always limit the SQL Query to 100 rows.
Always include all of the table columns and details.
Do not add any details that are not specified by the prompt.
Use the exact names from the schema even the underscores.
`;

export async function chatWithOllama(prompt: string): Promise<string> {
  prompt = sysMessage.concat(prompt);
  console.log("here again");
  const response = await fetch("http://localhost:3000/api/ai-query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    console.log("hi", response);
    throw new Error(`Error querying the model: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}

export async function queryNeonDB(SQL: string) {
  console.log("here is sql:", SQL);
  try {
    const result = await prisma.$queryRawUnsafe(SQL);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
