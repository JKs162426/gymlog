# GymLog

GymLog is a private, focused workout tracker for gym-goers who want to record useful training data without the complexity of a full fitness platform. Authenticated users can create sessions, add one or more exercises, review recent activity, edit complete workouts, and delete sessions they no longer need.

## Team

- Jesus Figueroa — [JKs162426](https://github.com/JKs162426)
- Henry Chizoba — [hengage](https://github.com/hengage)

## Public references

- Repository: [github.com/JKs162426/gymlog](https://github.com/JKs162426/gymlog)
- Production application: https://gymlog-beige.vercel.app/

The repository is public. The production deployment must also be public and must have `MONGODB_URI`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` configured before grading.

## Product demo summary

GymLog solves a common problem for lifters: recording enough information to make the next workout useful without navigating a crowded fitness product. It is intended for beginners and experienced gym-goers who want a fast, private history of dates, exercises, sets, repetitions, weights, and session notes.

The most important flow begins with account creation or login. After signing in, the athlete records a workout with one or more exercises. The dashboard immediately summarizes recent sessions, exercise count, and working sets, while the history view makes every workout discoverable. Opening a workout provides the complete exercise breakdown and intentional edit and delete paths. Every read and mutation is scoped to the authenticated user, so one account cannot access another account's workout records.

The profile view provides the second data-model workflow: users can read and update their name/email or permanently delete their profile and associated workouts. Clear empty, loading, validation, not-found, and failure states keep the primary flows understandable on desktop and mobile.

## Technology and architecture

- Next.js 16 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS 4 with shared palette, type, spacing, and component patterns
- MongoDB with Mongoose models for `User` and `Workout`
- NextAuth.js v4 credentials authentication with JWT sessions

Server Components query private data for dashboard, history, detail, edit, delete, and profile routes. Client Components are limited to interactive forms and buttons. The workout form demonstrates the required client → Route Handler → MongoDB cycle through `/api/workouts`.

## Local setup

1. Install Node.js 20 or newer and clone the repository.
2. Change into the application directory: `cd gymlog`.
3. Install the locked dependencies: `npm ci`.
4. Copy `.env.example` to `.env.local` and replace every placeholder.
5. Create a MongoDB database user with access to the GymLog database.
6. Start the app with `npm run dev` and open [http://localhost:3000](http://localhost:3000).

Generate a suitable authentication secret with `openssl rand -base64 32`. Never commit `.env.local` or real credentials.

## Deployment

1. Import `https://github.com/JKs162426/gymlog` into Vercel.
2. Keep the Root Directory at the repository root (`./`).
3. Add `MONGODB_URI`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` in the Vercel project settings.
4. Allow the deployment environment to connect in MongoDB Atlas Network Access.
5. Deploy the final merged `main` branch and verify register, login, workout CRUD, profile update, account deletion, and logout in an incognito window.

## API routes

| Method   | Route                | Authentication | Database operation                        |
| -------- | -------------------- | -------------- | ----------------------------------------- |
| `POST`   | `/api/auth/register` | Public         | Create a user with a bcrypt password hash |
| `GET`    | `/api/workouts`      | Required       | Read the current user's workouts          |
| `POST`   | `/api/workouts`      | Required       | Create a workout for the current user     |
| `GET`    | `/api/workouts/:id`  | Required       | Read one owned workout                    |
| `PUT`    | `/api/workouts/:id`  | Required       | Validate and update one owned workout     |
| `DELETE` | `/api/workouts/:id`  | Required       | Delete one owned workout                  |
| `GET`    | `/api/profile`       | Required       | Read the current user's profile           |
| `PUT`    | `/api/profile`       | Required       | Update name and email                     |
| `DELETE` | `/api/profile`       | Required       | Delete the user and associated workouts   |

Unauthorized requests return `401`; missing or non-owned resources return `404`; invalid input returns `400` or `409`.

## Grader access

This project uses **NextAuth.js v4 credentials authentication**. A grader may create a fresh account through `/register`; no invitation or external identity provider is required. If the Canvas submission supplies a shared demo account, use those credentials only on the public production URL.

Suggested verification flow:

1. Register and confirm automatic sign-in.
2. Add a workout containing at least two exercises.
3. Verify dashboard and workout-history data.
4. Open the workout, edit an exercise, and confirm the update.
5. Update the profile name, log out, and log back in.
6. Delete the workout. Account deletion can be tested last because it is permanent.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Before submission, run Lighthouse in a mobile incognito window for Performance, Accessibility, Best Practices, and SEO. Record those four scores in Canvas and use Chrome CSS Overview to confirm no WCAG color-contrast errors.

## Known issues and opportunities

- The current dashboard summarizes the five most recent workouts rather than long-term trends.
- Password reset and email verification are future production-hardening opportunities.
- Automated unit/integration coverage and a dedicated CI workflow remain opportunities.
- Lighthouse results should be captured again whenever the final deployed revision changes.
