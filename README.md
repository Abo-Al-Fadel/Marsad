# Marsad — Real-Time Incident Monitoring System

Welcome to **Marsad**, a university project designed to report and monitor incidents across Lebanon in real-time. It uses a community voting system to verify reports, ensuring accurate and up-to-date information.

---

## What Does It Do?

- **Live Map:** See incidents on an interactive map of Lebanon.
- **Community Moderation:** Users can "Confirm" or "Reject" reports. If a report gets +10 confirms, it becomes "Verified". If it gets -10, it's "Rejected".
- **Real-Time Feed:** See new incidents as they are reported.
- **Accounts:** Create an account to report incidents and vote on them.

---

## Built With

- **Frontend:** HTML, CSS (Dark Glassmorphism UI), and standard JavaScript.
  Served as static files from `backend/public/` — there is no build step.
- **Backend:** Laravel 13 (PHP 8.3), with Sanctum for API authentication.
- **Database:** MySQL (tested with WAMP Server).

---

## How to Run It Locally

Follow these simple steps to run the project on your computer:

### 1. Requirements
Make sure you have installed:
- PHP (8.3 or higher)
- Composer
- WAMP Server (or XAMPP) for MySQL

Node.js is **not** required — the frontend ships as plain CSS/JS.

### 2. Setup Instructions

1. **Clone the project** and open the `backend` folder in your terminal.
2. **Install dependencies:**
   ```bash
   composer install
   ```
3. **Setup environment:**
   Copy `.env.example` and rename it to `.env`.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. **Database Setup:**
   - Open WAMP/phpMyAdmin and create a new empty database named `marsad`.
   - Make sure your `.env` file matches your database settings (usually `DB_USERNAME=root` and no password).
5. **Run the Migrations and Seed data:**
   This creates the tables and adds some test data.
   ```bash
   php artisan migrate --seed
   ```
6. **Start the server:**
   ```bash
   php artisan serve
   ```
   Open `http://localhost:8000` in your browser!

### Test Account
You can log in with the default test account:
- **Email:** `system@marsad.lb`
- **Password:** `password123`

---

## 📁 Project Overview

- `backend/app/Http/Controllers/`: Contains the logic for users, incidents, and votes.
- `backend/public/js/`: Contains all the JavaScript that connects the frontend to the backend API.
- `backend/resources/views/`: Contains the HTML/Blade files for the web pages.
- `backend/routes/`: Contains the API endpoints and web routes.
- `backend/config/marsad.php`: The valid locations and incident types the API
  accepts, plus the reporting/edit time limits. The browser copy of these lists
  lives in `backend/public/js/data.js` — update both together.
- `OLDFrontend/`: The original static prototype, kept for reference only. It is
  not served by the application.

---

## 🔗 Database Relations (How Data is Connected)

To understand how the database works, here is the relationship between the 3 main models:

1. **User (1-to-Many) Incidents:**
   A single User can report many Incidents. Every Incident belongs to exactly one User.
2. **User (1-to-Many) Votes:**
   A single User can cast many Votes. Every Vote belongs to exactly one User.
3. **Incident (1-to-Many) Votes:**
   A single Incident can have many Votes from different users.
4. **Unique Vote Constraint:**
   A User can only have **one** Vote per Incident. If they vote again, their previous vote is updated or removed (toggled).
