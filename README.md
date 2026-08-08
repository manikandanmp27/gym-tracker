# 🏋️‍♂️ GymTracker

A clean, modern, and privacy-focused full-stack web application designed to help you log your workouts, track your compound lift Personal Records (PRs), analyze your training distribution, and maintain your active workout streak.

The user interface features a custom flat-matte dark charcoal design with active electric lime highlights, optimized for high contrast and modern typography.

🔗 **Live Link**: [https://gym-tracker-r9ma.onrender.com](https://gym-tracker-r9ma.onrender.com)

---

## 🚀 Key Features

* **User Accounts & Privacy**: Secure signup and login flow. Your workouts are isolated to your account ID so other users cannot see your logs.
* **Compound Lift PR Tracker**: Automatically calculates and displays your Personal Record (PR) for Bench Press, Squat, and Deadlift. If you log the same weight twice, it breaks the tie by choosing the session with the higher rep count!
* **Dynamic Active Streak**: A smart calculator that counts your consecutive training days. It ignores multiple workouts logged on the same calendar day so your streak is never falsely inflated.
* **Custom Date Selector**: A calendar date picker in the logger form lets you log past workouts retroactively.
* **Workout Analytics**: A clean, dynamically scaled bar chart displaying your training splits across Push, Pull, Legs, and Cardio sessions.
* **Account Settings**: A profile page to review account summary stats and securely update your password in real-time.

---

## 🛠️ The Tech Stack

### Frontend (React + Vite)
* **React**: Structured with dynamic views (Dashboard, Logger, Analytics, Profile, Auth).
* **Styling**: Tailored raw CSS focusing on responsive grid layouts, custom scrollbars, and snappy hover transitions.
* **Typography**: Powered by the clean, geometric sans-serif **Inter** font.

### Backend (Node.js + Express)
* **Express API**: REST API endpoints for secure logins, signups, workout logging, page loading, and password updates.
* **Bcryptjs Security**: Secure password hashing with 10 salt rounds. Plaintext passwords are never saved.
* **Database (SQLite)**: Fully relational storage saved to a local `database.db` file.
* **SQL Queries**: Powered by parameterized queries to block SQL Injection vulnerabilities.
* **Auto-Migrations**: The server automatically updates database tables and injects columns if you run it on older database schemas.

---

## 💻 How to Set Up and Run

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Run the Backend API
Navigate to the `backend` folder, install dependencies, and launch the server:
```bash
cd backend
npm install
npm run dev
```
The backend server will start running on **`http://localhost:5000`** and automatically compile your `database.db` file.

### 2. Run the Frontend Client
Open a second terminal window, navigate to the `frontend` folder, install dependencies, and launch the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start running on **`http://localhost:5173`** (or `http://localhost:5174` if port 5173 is occupied). Open the link in your browser to start tracking!
