Team members working on this project: Jesus Figueroa

Project's name: GymLog

Description: GymLog is a personal workout tracking application designed for gym-goers who want a simple and focused way to record their training sessions. Users can log their routines, track exercises with sets and reps, and monitor their progress over time without the complexity of bloated fitness apps.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# GymLog Project Constitution

## Project Overview

GymLog is a personal workout tracking application designed for gym-goers who want a simple and focused way to record their training sessions. The application allows users to log their routines, track exercises with sets and reps, and monitor their progress over time without the complexity of bloated fitness apps.

---

## Governing Principles

### 1. Simplicity and Focus

- The application must prioritize simplicity and usability, ensuring that users can log workouts quickly and efficiently.
- Avoid unnecessary features that detract from the core purpose of workout tracking.

### 2. Consistency and Maintainability

- Code must adhere to strict TypeScript standards, including:
  - Enabling `strict` mode.
  - Avoiding the use of `any` type.
- Follow Tailwind CSS conventions:
  - Use utility-first classes for styling.
  - Avoid custom CSS unless absolutely necessary.
- Implement Next.js best practices:
  - Use server components for data-fetching logic and client components for interactive UI.
  - Adhere to file-based routing conventions.

### 3. Testing and Quality Assurance

- All features must include unit tests and integration tests.
- Use testing libraries such as Jest and React Testing Library.
- Ensure 100% test coverage for critical components and business logic.

### 4. Collaboration and Communication

- Use clear and descriptive naming conventions for files, variables, and functions.
- Follow a consistent Git workflow:
  - Use feature branches for development.
  - Write meaningful commit messages.
- Conduct regular code reviews to ensure adherence to project standards.
- Document all major decisions and changes in the project wiki.

---

## Development Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library

---

## Team Guidelines

- Maintain open communication through team collaboration tools (e.g., Slack, Notion).
- Respect deadlines and communicate blockers early.
- Encourage knowledge sharing and pair programming to improve team skills.

---

## Template Tokens

The following tokens must be replaced with project-specific values:

- `[PROJECT_NAME]`: GymLog
- `[PRINCIPLE_1_NAME]`: Simplicity and Focus
- `[PRINCIPLE_2_NAME]`: Consistency and Maintainability
- `[PRINCIPLE_3_NAME]`: Testing and Quality Assurance
- `[PRINCIPLE_4_NAME]`: Collaboration and Communication

# Project Specification: GymLog

## Project Title

GymLog: A Simple Workout Tracking Application

---

## Project Description

GymLog is a personal workout tracking application designed for gym-goers who want a simple and focused way to record their training sessions. The application allows users to log their routines, track exercises with sets and reps, and monitor their progress over time without the complexity of bloated fitness apps.

---

## Purpose and Target Audience

### Purpose

To provide gym-goers with an intuitive and efficient tool to track their workouts, enabling them to focus on their fitness goals without distractions.

### Target Audience

- Fitness enthusiasts who prefer simplicity over feature-heavy fitness apps.
- Beginners who want an easy way to start tracking their workouts.
- Experienced gym-goers who need a fast and reliable workout logging tool.

---

## User Stories and Acceptance Criteria

### 1. User Registration and Login

**User Story**: As a user, I want to sign up and log in securely so that I can access my workout data.  
**Acceptance Criteria**:

- Users can sign up with an email and password.
- Passwords must be hashed and stored securely.
- Users can log in with valid credentials.
- Invalid login attempts show an error message.

---

### 2. Create a Workout Log

**User Story**: As a user, I want to create a workout log so that I can track my exercises for a session.  
**Acceptance Criteria**:

- Users can add a workout session with a date and optional notes.
- Users can add exercises to the session, including exercise name, sets, reps, and weight.
- The system validates required fields (e.g., exercise name, sets, reps).

---

### 3. View Workout Logs

**User Story**: As a user, I want to view my past workout logs so that I can monitor my progress.  
**Acceptance Criteria**:

- Users can view a list of past workout sessions.
- Users can click on a session to see detailed exercises.
- Logs are displayed in reverse chronological order.

---

### 4. Update a Workout Log

**User Story**: As a user, I want to update my workout logs so that I can correct or add information.  
**Acceptance Criteria**:

- Users can edit workout session details (e.g., date, notes).
- Users can update exercises (e.g., change sets, reps, or weight).
- Changes are saved and reflected immediately.

---

### 5. Delete a Workout Log

**User Story**: As a user, I want to delete a workout log so that I can remove incorrect or unnecessary data.  
**Acceptance Criteria**:

- Users can delete a workout session.
- Users are prompted to confirm deletion.
- Deleted logs are removed from the database.

---

## API Endpoints

### 1. User Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a token.

### 2. Workout Logs

- **POST /api/workouts**: Create a new workout log.
- **GET /api/workouts**: Retrieve all workout logs for the user.
- **GET /api/workouts/:id**: Retrieve a specific workout log.
- **PUT /api/workouts/:id**: Update a specific workout log.
- **DELETE /api/workouts/:id**: Delete a specific workout log.

---

## Implementation Priority

1. **User Authentication**: Implement secure user registration and login.
2. **Workout Log CRUD Operations**:
   - Create workout logs.
   - View workout logs.
   - Update workout logs.
   - Delete workout logs.
3. **UI/UX Design**: Build a clean and intuitive interface using Next.js and Tailwind CSS.
4. **Testing**: Write unit and integration tests for all core features.
5. **Deployment**: Deploy the application to a production environment.

---

This specification provides a clear roadmap for building the GymLog application. Let me know if you need further details or adjustments!

