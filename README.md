# Expense Tracker

A full-stack Expense Tracker application to manage personal expenses, categories, and users. Built with **TypeScript**, **Next.js**, **Express**, and **MongoDB**.

---

![status](https://img.shields.io/badge/status-in_development-yellow)

This project is currently under active development. Core features are being implemented and may change without notice. Production deployment is not recommended yet.


## Features

- Add, view, update, and delete expenses.
- Categorize expenses.
- User authentication (JWT-based).
- Admin and normal user roles.
- Dashboard with charts (planned).
- Responsive UI (basic layout implemented).

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript, MongoDB
- **API:** Axios for HTTP requests

---

## Installation

### Backend

1. Install dependencies:

```bash
cd backend
npm install
 ```
2. Run in development:
   
```bash
node src/server.js
```
### Frontend

1. Install dependencies:
   
```bash
cd frontend
npm install
 ```
2. Run development server:

```bash
npm run dev
```
Frontend runs on http://localhost:3000 and backend on http://localhost:4000 by default.

### Project Structure

```bash
backend/       # Express server, API routes, models
frontend/      # Next.js frontend, components, pages
```
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
