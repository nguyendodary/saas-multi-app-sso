# SaaS Multi-App SSO Ecosystem 🚀

A comprehensive **Single Sign-On (SSO)** and **Role-Based Access Control (RBAC)** architecture demonstrating how to securely share authentication state across multiple discrete React applications utilizing a centralized Node.js Authentication Server.

Designed with a premium enterprise dark-mode aesthetic utilizing modern CSS variables and Tailwind CSS v4.

---

## 🏗️ Architecture

The ecosystem securely manages cross-app sessions utilizing **HttpOnly JWT Cookies** to thwart XSS attacks, alongside rigorous internal React **Axios Interceptors** to gracefully catch `401 Unauthorized` requests and facilitate rapid silent token refreshing.

### Project Composition

| Package | Port | Stack | Description | Access Tier |
|---------|:----:|-------|-------------|-------------|
| **Auth Server** | `:5000` | Express, Sequelize, SQLite, Passport.js | Centralized JWT issuance & robust user security | *Internal* |
| **TaskFlow App** | `:3000` | React, Vite, Redux, Tailwind v4 | Enterprise task/kanban tool for administrators | **Admin Only** |
| **ZenNotes App** | `:3001` | React, Vite, Redux, Tailwind v4 | Ecosystem documentation and user workflow portal | **Admin & User** |

---

## ✨ Key Features

- **Centralized Authentication (SSO)**: One login grants seamless localized access to both `client-taskflow` and `client-zennotes` without ever requiring a secondary sign-in.
- **RBAC (Role-Based Access Control)**: Granularly protects frontend routes and backend APIs. Standard users traversing to Admin-only zones are intercepted and denied access instantly.
- **HttpOnly Secure Tokens**: JSON Web Tokens for Access (15m expiration) and Refresh (7d expiration) exist safely within unreadable cookies isolated from browser JavaScript.
- **Vite Development Proxies**: Resolves complex browser CORS and `SameSite` restrictions implicitly by leveraging identical origins via Vite API proxies during execution.
- **Premium Glassmorphism UI**: Dynamic UI layers utilizing structural backdrop filters alongside `--color-*` root CSS theme extraction techniques.

---

## 🚀 Getting Started

Ensure you have **Node.js** (v18+) installed. A zero-config SQLite database is securely utilized for frictionless immediate local deployment.

### 1. Initialize the Auth Server and Database
The Auth server drives the session ecosystem. Establishing it first will automatically seed the SQLite database with roles and credentials.

```bash
cd auth-server
npm install
npm run seed       # Seeds the database with requisite testing roles and accounts
npm run dev        # Boots the Auth Server onto http://localhost:5000
```

### 2. Launch the Client Applications
Initialize TaskFlow securely in a new isolated terminal:

```bash
cd client-taskflow
npm install
npm run dev        # Boots the Admin Application onto http://localhost:3000
```

Initialize ZenNotes robustly in a tertiary terminal:

```bash
cd client-zennotes
npm install
npm run dev        # Boots the Generic Environment onto http://localhost:3001
```

---

## 🔑 Demonstration Credentials

Initiate navigation towards `http://localhost:3000` or `http://localhost:3001` to be forcefully redirected to the enterprise portal login. Use the following sandbox credentials to explore the dynamic navigation barriers.

| Persona | Email | Password | Allowed Access |
|---------|-------|----------|----------------|
| **Administrator** | `admin@saas-ecosystem.com` | `admin123` | TaskFlow & ZenNotes |
| **Standard User** | `user@saas-ecosystem.com` | `user123` | ZenNotes Only |

> Note: Logging out from either application inherently purges the centralized HttpOnly cookies, cleanly terminating sessions system-wide.
