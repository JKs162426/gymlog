# GymLog Copilot Instructions

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode, no `any`)
- Styling: Tailwind CSS (utility-first, no custom CSS)
- Database: MongoDB with Mongoose
- Auth: NextAuth.js with credentials provider

## Project Structure

- `app/` — routes and pages (App Router)
- `lib/` — database connection and models
- `components/` — reusable UI components

## Data Models

- **User**: email, password (hashed), timestamps
- **Workout**: userId, date, notes, exercises[], timestamps
- **Exercise** (embedded in Workout): name, sets, reps, weight

## Conventions

- Server Components for data fetching
- Client Components (`"use client"`) for forms and interactivity
- API routes in `app/api/`
- Use `connectDB()` before every Mongoose query
- Passwords hashed with bcryptjs before storing
