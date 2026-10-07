# Fitness & Workout Tracker System

CPS 714 (Fall 2026) team project: a web app for creating workouts and tracking fitness progress.

**Team:** Abdulrahman Hilowle, Shreyas Nyapathi, Sathurshan Vijayaratnam
**Stack:** React + TypeScript (Vite), Node.js + Express, MongoDB (Mongoose)

## Sprint 1 status

| Feature | Owner | Where |
|---|---|---|
| Registration, login, protected routes (JWT) | Shreyas | `backend/src/routes/auth.js`, `frontend/src/pages/Login.tsx`, `Register.tsx` |
| Exercise library (20 seeded exercises, muscle-group filter) | Sathurshan | `backend/src/routes/exercises.js`, `backend/src/seed.js`, `frontend/src/pages/ExerciseLibrary.tsx` |
| Initial workout creation page with exercise selection | Abdulrahman | `backend/src/routes/workouts.js`, `frontend/src/pages/NewWorkout.tsx` |

Not yet built (later sprints): logging sets/reps/weights (Sprint 2), workout history (Sprint 2), edit/delete and progress dashboard (Sprint 3).

## Run locally

Prerequisites: Node.js 18+ and a running MongoDB (local install or a free MongoDB Atlas cluster).

```bash
# 1. Backend
cd backend
cp .env.example .env        # then edit JWT_SECRET (and MONGODB_URI if not local)
npm install
npm run seed                # loads the exercise library
npm run dev                 # API on http://localhost:5000

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev                 # app on http://localhost:5173
```

## API (Sprint 1)

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | no | Create account, returns JWT |
| POST | `/api/auth/login` | no | Log in, returns JWT |
| GET | `/api/auth/me` | yes | Current user |
| GET | `/api/exercises?muscleGroup=&q=` | yes | List/filter exercises |
| POST | `/api/workouts` | yes | Create workout `{ name, exercises: [ids] }` |
| GET | `/api/workouts` | yes | List the current user's workouts |

## Team workflow

- Work on a feature branch (`feature/<name>`), open a pull request, and have one teammate review before merging to `main`.
- Never commit `.env` (it is git-ignored).
