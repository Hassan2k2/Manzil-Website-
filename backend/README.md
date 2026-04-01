# Manzil Custom Backend

This is the custom Node.js backend created for the Manzil project. It replaces the previous Supabase Backend-as-a-Service architecture, giving you full control over authentication, database schema, and LLM integrations.

## Tech Stack
- **Node.js + Express** (Written in TypeScript)
- **Prisma ORM** for type-safe database access
- **PostgreSQL** Database
- **JSON Web Tokens (JWT)** + **bcrypt** for fast and secure Authentication
- **OpenAI Node SDK** for AI Scoring and Recommendations

## Setup Instructions

1. **Database Setup**
   Ensure you have PostgreSQL installed on your machine (or use a cloud provider like Supabase/Neon).
   Open the `.env` file in the `backend/` directory and update the `DATABASE_URL` with your connection string:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/manzil?schema=public"
   ```

2. **Add OpenAI Key**
   In `.env`, place your actual OpenAI API key to enable live LLM scoring.
   ```env
   OPENAI_API_KEY="sk-..."
   ```

3. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Run Database Migrations**
   This will execute the Prisma schema and create your SQL tables in Postgres.
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:5000`

## Frontend Connections

The React/Vite frontend has already been refactored to hit this new backend! 
- **Auth**: `AuthContext.tsx` now calls `/api/auth/login` and `/api/auth/register`
- **Assessments**: `useAssessmentSession` hits `/api/assessment/progress`
- **AI Scoring**: `useAICareerScoring` hits `/api/ai/recommend`
