# SaaS Multi-App SSO

A full-stack Single Sign-On (SSO) and Role-Based Access Control (RBAC) system. It features a centralized Node.js authentication server and two React client applications that share authentication state seamlessly via HttpOnly JWT cookies.

## Tech Stack
- **Backend:** Node.js, Express, Sequelize (SQLite), Passport.js (Local/Google OAuth2), JWT
- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS v4, Axios
- **Infrastructure:** Docker Compose

## Project Structure
- `auth-server` (Port 5000) - Centralized authentication API and login portal.
- `client-taskflow` (Port 3000) - Admin-only React application.
- `client-zennotes` (Port 3001) - React application accessible by both Admins and Standard Users.

## Getting Started

### Option 1: Docker Compose (Recommended)
Run the entire ecosystem simultaneously using Docker.

```bash
docker compose up -d
```
*To stop the containers, run `docker compose down`.*

### Option 2: Local Development (Node.js)
Requires Node.js v18+.

**1. Start the Auth Server**
```bash
cd auth-server
npm install
npm run seed  # Generates the local SQLite database
npm run dev   # Starts on http://localhost:5000
```

**2. Start the Client Applications (in separate terminals)**
```bash
cd client-taskflow && npm install && npm run dev
```
```bash
cd client-zennotes && npm install && npm run dev
```

*(Note: If you encounter an `EADDRINUSE` error for port 5000, ensure you close any previous running terminal instances of the Auth Server).*

## Demo Credentials
Navigate to `http://localhost:3000` or `http://localhost:3001` in your browser. You will be redirected to the centralized login page.

- **Admin Account:** `admin@saas-ecosystem.com` / `admin123` (Accesses both apps)
- **User Account:** `user@saas-ecosystem.com` / `user123` (Accesses only ZenNotes)
