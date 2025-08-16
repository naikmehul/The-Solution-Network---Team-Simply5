# 🏛️ Local Grievance App – Frontend  

This project is the **frontend application** for the Local Grievance System, built with **React (Vite)**.  
It allows users to **report, track, and view local issues** in their community.  

---

## 📅 Milestone Submission (50%)  

- **Milestone Due Date**: **16.08.2025**  
- **GitHub Repository Link**: [👉 Insert Your Repo URL Here]  
- **Requirements Covered**:  
  - ✅ Project setup using React + Vite  
  - ✅ Basic folder/component structure implemented  
  - ✅ Navbar, Home, Issues, and Profile pages created  
  - ✅ Code in runnable state (`npm run dev`)  
  - ⬜ Backend API connection (`GET /api/issues`) – *to be completed for final milestone check*  

---

## 📂 Project Structure  

```
src/
│
├─ components/       # Reusable UI components
│   ├─ Navbar.jsx
│   ├─ IssueList.jsx
│   ├─ IssueCard.jsx
│   ├─ IssueDetail.jsx
│   └─ Profile.jsx
│
├─ pages/            # Page views
│   ├─ Home.jsx
│   ├─ Issues.jsx
│   └─ ProfilePage.jsx
│
├─ services/         # API integration
│   └─ api.js
│
├─ App.jsx           # Main app container
├─ main.jsx          # React entry point
└─ index.css         # Global styles
```

---

## ⚡ Features (Milestone)  

- ✅ Project initialized with **React + Vite**  
- ✅ Basic **navigation and pages** (Home, Issues, Profile)  
- ✅ Simple **component structure** for Issues + Profile  
- ✅ **Responsive layout** using CSS  
- ⬜ **Backend integration (GET /api/issues)** – coming next  

---

## 🎯 Final Scope (Post-Milestone)  

- [ ] Connect Issues page with backend API (`GET /api/issues`)  
- [ ] Add **create new issue** form (`POST /api/issues`)  
- [ ] Add **update/delete issue** functionality  
- [ ] Integrate **user login/register** with backend auth  
- [ ] Improve **styling** (cards, buttons, mobile view)  
- [ ] Add **loading states & error handling**  

---

## 🚀 Getting Started  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/your-username/local-grievance-app.git
cd local-grievance-app/frontend
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Run Development Server  
```bash
npm run dev
```

App runs at **http://localhost:5173/** 🎉  

---

## 🔗 Backend API Integration  

The frontend will connect to the backend API at:  
- `GET /api/issues` → Fetch all issues  
- `GET /api/issues/:id` → Fetch single issue  
- (Post-milestone) `POST /api/issues` → Create issue  

> ⚠️ Ensure the backend is running on **http://localhost:5000/** before testing API features.  

---

## 📸 Screenshots  

### Home Page  
![Home Page](screenshots/home.png)  

### Issues Page  
![Issues Page](screenshots/issues.png)  

---

## 👨‍💻 Team Members  

- Your Name  
- Teammate 2  
- Teammate 3  

---

✨ *Milestone submission complete (50% functional frontend). Final version will include full CRUD, backend integration, and polished UI.*  
