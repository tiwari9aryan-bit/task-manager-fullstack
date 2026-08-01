# Task Manager — Full-Stack Web Application

A full-stack task management application that allows users to securely create, manage, update, filter, and organize their tasks through a modern web interface.

The application uses JWT-based authentication, a RESTful backend API, PostgreSQL for persistent data storage, and a responsive React frontend.

## 🚀 Live Demo

> Add your deployed application URL here.

## 📸 Screenshots

> Add screenshots of the application here.

<!-- Example:
![Login Page](assets/login.png)
![Task Dashboard](assets/dashboard.png)
![Create Task](assets/create-task.png)
-->

## ✨ Features

### Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Token expiration handling
- User-specific task access

### Task Management
- Create new tasks
- View all personal tasks
- View individual task details
- Update existing tasks
- Delete tasks
- Update task status
- Set task priority
- Add task descriptions
- Set due dates

### Task Organization
- Filter tasks by status
- Filter tasks by priority
- Status indicators
- User-specific task isolation

### Developer Experience
- RESTful API architecture
- PostgreSQL database with Sequelize ORM
- Automated backend testing
- GitHub Actions CI
- Docker support
- Docker Compose for local development
- Render deployment configuration

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Sequelize ORM

### Database

- PostgreSQL

### Testing

- Jest
- Supertest
- SQLite (in-memory test database)

### DevOps & Deployment

- Docker
- Docker Compose
- GitHub Actions
- Render

---

## 🏗️ Architecture

```text
┌─────────────────────────┐
│                         │
│     React Frontend      │
│       Vite + Tailwind   │
│                         │
└────────────┬────────────┘
             │
             │ REST API
             │ Axios
             ▼
┌─────────────────────────┐
│                         │
│    Express.js Backend   │
│                         │
│  ┌───────────────────┐  │
│  │ JWT Authentication│  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Task CRUD APIs   │  │
│  └───────────────────┘  │
│                         │
└────────────┬────────────┘
             │
             │ Sequelize ORM
             ▼
┌─────────────────────────┐
│                         │
│      PostgreSQL         │
│                         │
│   Users + Tasks Data    │
│                         │
└─────────────────────────┘

## 📁 Project Structure

```text
task-manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── render.yaml
├── .gitignore
└── README.md
