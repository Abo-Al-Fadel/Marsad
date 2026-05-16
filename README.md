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
- **Backend:** Laravel 11 (PHP).
- **Database:** MySQL (tested with WAMP Server).

---

## How to Run It Locally

Follow these simple steps to run the project on your computer:

### 1. Requirements
Make sure you have installed:
- PHP (8.2 or higher)
- Composer
- WAMP Server (or XAMPP) for MySQL

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
