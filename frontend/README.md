# Grievance Portal – Frontend

This is the **frontend React application** for the Grievance Portal, built with **React + Vite + TailwindCSS + React Router**.  
It connects to the backend API (Node.js + Express) for managing grievances.

---

## Features
- Login & Register pages (localStorage-based demo authentication).  
- Dashboard with statistics and complaint category cards.  
- All Grievances page with status badges & categories.  
- Create New Grievance form (POST request to backend).  
- View/Delete grievance details.  
- TailwindCSS styling, responsive on desktop & mobile.  

---


## Setup & Run Locally

1. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
---
The app will run at -- http://localhost:5173
---
NOTE : The frontend will only display data if the **backend server is running on port 4000**.  

- Start the backend first:
  cd backend
  npm start

- Then start the frontend:
  cd frontend
  npm run dev
