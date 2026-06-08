# Robot Kits E-Commerce

A complete e-commerce project built with Next.js (App Router), Prisma, PostgreSQL, NextAuth, and Stripe.

## Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Stripe Account (for test mode)

## Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables example file and fill in your values:
   ```bash
   cp .env.example .env
   ```
   *Make sure to update `DATABASE_URL` with your local PostgreSQL credentials.*

3. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev --name init
   ```

4. Seed the database with initial products and an admin user (admin@example.com / admin123):
   ```bash
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- Frontend: Next.js (App Router)
- Backend: API Routes (Next.js)
- Database: PostgreSQL & Prisma ORM
- Auth: NextAuth.js (Email/Password)
- State Management: Zustand
- Payments: Stripe (Sandbox)
