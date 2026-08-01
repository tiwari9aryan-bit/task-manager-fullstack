# Task Manager

A full-stack task management application built with React, Node.js, Express, PostgreSQL, and Sequelize. Users can securely register, authenticate, and manage their own tasks with status and priority filtering.

## Features

- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Protected REST API routes
- Create, read, update, and delete tasks
- Task status: `todo`, `in-progress`, `done`
- Task priority: `low`, `medium`, `high`
- Filter tasks by status and priority
- User-specific task access and authorization
- Responsive React dashboard
- Automated backend API tests with Jest and Supertest
- SQLite in-memory database for isolated test runs
- GitHub Actions CI for backend tests and frontend builds
- Docker and Docker Compose support for local PostgreSQL development
- Render deployment configuration

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- JWT
- bcryptjs

### Testing & DevOps
- Jest
- Supertest
- GitHub Actions
- Docker
- Docker Compose
- Render

## Project Structure

```text
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   └── tests/
├── frontend/
│   └── src/
├── .github/workflows/
├── docker-compose.yml
└── render.yaml
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL, or Docker Desktop

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd task-manager
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Update `.env` with your PostgreSQL credentials and a strong local JWT secret. Never commit `.env` to Git.

### 3. Install dependencies

```bash
npm install
cd ../frontend
npm install
```

### 4. Start PostgreSQL

You can use an existing PostgreSQL installation or run the included Docker Compose setup from the project root:

```bash
docker compose up -d postgres
```

### 5. Start the backend

```bash
cd backend
npm run dev
```

The API runs on `http://localhost:5000`.

### 6. Start the frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on the Vite development server.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |

### Tasks

All task endpoints require a Bearer JWT token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List authenticated user's tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Optional filters:

```text
GET /api/tasks?status=done
GET /api/tasks?priority=high
GET /api/tasks?status=todo&priority=medium
```

## Testing

Backend tests use Jest and Supertest with an isolated in-memory SQLite database.

```bash
cd backend
npm test
```

## CI

GitHub Actions runs automatically on pushes and pull requests targeting `main`. The workflow:

- Installs backend dependencies and runs the test suite
- Installs frontend dependencies and verifies the production build

## Docker

To start PostgreSQL and the backend together:

```bash
docker compose up --build
```

## Environment Variables

Backend variables are documented in `backend/.env.example`. For production, configure secrets through your deployment platform rather than committing them to source control.

## Security Notes

- `.env` files are ignored by Git.
- Production deployments require an explicit `JWT_SECRET`.
- Passwords are hashed before storage.
- Task queries are scoped to the authenticated user.
- Never commit real credentials, API keys, or database passwords.

## Future Improvements

- Add database migrations with Sequelize CLI
- Add refresh-token based authentication
- Add pagination and server-side sorting
- Add more comprehensive authorization and validation tests
- Add frontend unit and component tests

## License

This project is available for educational and portfolio purposes.
