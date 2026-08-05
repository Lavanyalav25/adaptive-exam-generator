# SkillForge AI E-Learning Platform

![SkillForge AI Logo](skillforge_ai_logo_1778906616234.png)

## About

SkillForge AI is an AI-powered e-learning platform that enables instructors to create courses and generate quizzes automatically using AI. Students can learn through interactive assessments, track their progress, and receive personalized learning experiences.

---

## 🚀 Features

- AI-Powered Quiz Generation
- Instructor Dashboard
- Student Dashboard
- Course Management
- Learning Progress Tracking
- Real-Time Analytics
- Secure User Authentication
- Rich Text Course Editor

---

## 🛠️ Tech Stack

### Frontend
- Angular 18+
- Angular Material
- HTML5
- CSS3
- TypeScript
- Chart.js
- Quill Editor

### Backend
- Node.js
- Express.js
- Sequelize ORM

### Database
- MySQL

### AI Integration
- OpenAI API

### Security
- JWT Authentication
- Bcryptjs

---

## 📋 Prerequisites

- Node.js (v18 or later)
- MySQL Server
- Angular CLI (Optional)

---

## 🗄️ Database Setup

Create the database:

```sql
CREATE DATABASE skillforge_db;
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=skillforge_db

JWT_SECRET=YOUR_JWT_SECRET
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

---

## ▶️ Installation

Install all dependencies:

```bash
npm run install-all
```

---

## ▶️ Run the Application

```bash
npm start
```

Or run:

```
run_project.bat
```

---

## 🌐 Access the Application

Frontend

```
http://localhost:4200
```

Backend

```
http://localhost:5000
```

---

## 📁 Project Structure

```text
backend/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   └── server.js

frontend/
 ├── src/
 │   ├── app/
 │   └── assets/

run_project.bat
```

---

## 🚀 Future Enhancements

- AI-Based Personalized Learning
- Adaptive Quiz Difficulty
- AI Interview Preparation
- Learning Analytics
- Email Notifications
- Mobile Application Support
