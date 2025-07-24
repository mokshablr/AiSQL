# AiSQL — Talk to Your Database

AiSQL is a modern SaaS starter kit that lets users interact with a **PostgreSQL** database using **natural language**, powered by **AI**. Designed with multi-tenancy and roles, AiSQL supports admins, staff, and students to "talk to their data" via an intuitive chat-based interface.

---

## Features

### AI-Powered SQL Generation
- Accepts plain English questions and converts them into SQL queries using AI.
- Returns:
  - ✅ The generated SQL
  - ✅ Executed result
  - ✅ JSON-formatted summary
  - ✅ Reasoning behind the query (optional)

### Interactive Query Console
- Chat-style UI to send queries and view results.
- Enables real-time interaction with structured data.

### Authentication & Multi-Tenancy
- Built with [Auth.js](https://authjs.dev/)
- Supports user roles:
  - `ADMIN`
  - `STAFF`
  - `STUDENT`
- Multi-tenant logic for separating user/org data.

---

## 🧱 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database Hosting**: [Neon](https://neon.tech/)
- **Authentication**: [Auth.js](https://authjs.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Boilerplate Base**: Built on top of [Next SaaS Stripe Starter](https://github.com/colinhacks/next-saas-starter)

---

## 🧪 Sample Prompts

Try these in the chat console:

- `What is the average CGPA of students in the Computer Science department?`
- `Add a new student named Alex Johnson with ID 1234.`
- `List all courses taught by Dr. Smith.`
- `How many students enrolled in each course this semester?`
- `Update the grade for student 1234 in course CS101 to A.`

---
