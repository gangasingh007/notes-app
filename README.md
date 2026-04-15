# Notes App

A Next.js-based educational notes platform with an admin dashboard for managing classes, subjects, and learning resources, plus a student-facing portal for browsing course content.

## Key Features

- **Admin authentication** via JWT cookies.
- **Admin dashboard** for adding, editing, and deleting classes, subjects, and resources.
- **Student portal** with class listings, subject pages, and resource details.
- **Prisma + PostgreSQL** for database modeling and data access.
- **Modern UI stack** using Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and Radix UI.
- **Syllabus viewer** with embedded PDF support.

## Project Structure

- `app/` - Next.js App Router pages and layouts.
- `components/` - Reusable UI components, admin views, and student views.
- `lib/actions/` - Server actions for authentication, class management, and resource management.
- `lib/prisma.ts` - Prisma client initialization.
- `prisma/` - Prisma schema and migration history.
- `types/` - TypeScript definitions.
- `zod/` - Validation schemas.
- `admins/` - Admin allowlist data for registration.

## User Flows

### Admin

- Register at `/admin/register` using a pre-approved admin email and phone number from `admins/index.ts`.
- Login at `/admin/login`.
- Manage classes and subjects at `/admin/manage`.
- Protected admin route at `/admin` redirects to login if unauthenticated.

### Students

- Browse classes at `/home`.
- View subject details via `/home/[subjectId]`.
- Access resources for a subject via `/home/[subjectId]/[id]`.
- Read syllabus at `/syllabus`.
- View the coming soon datesheet page at `/datesheet`.

## Database Schema

The Prisma schema defines these models:

- `User` - Admin user accounts.
- `Class` - Courses with semester and section details.
- `Subject` - Subjects tied to a specific class.
- `Resource` - Learning resources linked to subjects.
- `ResourceType` enum - `video` or `document`.

## Environment Variables

Create a `.env` file in the project root with at least the following values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secure-jwt-secret"
```

## Installation

```bash
npm install
```

After install, the package has a `postinstall` hook that runs Prisma generate.

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Database Setup

If you are connecting to a fresh PostgreSQL database, run one of these commands:

```bash
npx prisma migrate dev
```

or, if you only want to sync the schema without generating a migration:

```bash
npx prisma db push
```

## Production Build

```bash
npm run build
npm run start
```

## Useful Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the production app.
- `npm run start` - Run the built app.
- `npm run lint` - Run ESLint.

## Notes

- The admin signup is restricted by the allowed admin list in `admins/index.ts`.
- The app uses server-side Prisma access through `lib/prisma.ts` and the generated client in `app/generated/prisma`.
- The `prisma/` folder includes migration history, so database deployment can follow existing migration steps.

## Tech Stack

- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS v4
- Prisma 7.7.0
- PostgreSQL
- JWT authentication

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies and run the app locally.
4. Open a pull request with a description of your changes.

---

Built for managing class content, resource links, and admin workflows in a modern Next.js app.
