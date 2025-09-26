# 📘 Grievance Portal – Frontend

This is the **frontend React application** for the Grievance Portal, built with **React + Vite + TailwindCSS + React Router**.  
It connects to the backend API (Node.js + Express) for managing grievances.

---

## 🚀 Features
- Login & Register pages (localStorage-based demo authentication).  
- Dashboard with statistics and complaint category cards.  
- All Grievances page with status badges & categories.  
- Create New Grievance form (POST request to backend).  
- View/Delete grievance details.  
- Styled with Tailwind CSS, responsive layout for desktop & mobile.  

---

## 📂 Project Structure
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│ └── logo.png
└── src/
├── App.jsx
├── main.jsx
├── index.css
├── api.js
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── GrievanceCard.jsx
└── pages/
├── Login.jsx
├── Register.jsx
├── GrievanceList.jsx
├── NewGrievance.jsx
├── GrievanceDetail.jsx
└── Dashboard.jsx

text


---

## ⚙️ Setup & Run Locally

1. Navigate into the frontend folder:
   ```bash
   cd frontend
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
The app will be available at 👉 http://localhost:5173

