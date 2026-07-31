# SkillForge AI E-Learning Platform

![SkillForge AI Logo](skillforge_ai_logo_1778906616234.png)

SkillForge AI is a cutting-edge, AI-powered e-learning platform designed to revolutionize the way instructors create content and students learn. By leveraging the power of OpenAI, SkillForge AI automates the generation of high-quality quizzes, providing an adaptive and engaging learning experience.

## 🚀 Features

- **AI-Powered Quiz Generation**: Automatically create comprehensive quizzes from course content using OpenAI's GPT models.
- **Dynamic Instructor Dashboard**: Manage courses, track student performance, and generate AI-driven assessments with ease.
- **Intuitive Student Portal**: Track learning progress through visual charts and engage with interactive course materials.
- **Real-time Analytics**: Integrated Chart.js visualizations for monitoring academic growth and quiz performance.
- **Secure Authentication**: Robust user authentication system powered by JWT and Bcryptjs.
- **Rich Text Editing**: Create beautiful course descriptions and content using the integrated Quill editor.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 18+
- **UI Components**: Angular Material
- **Icons**: Lucide Angular
- **Charts**: Chart.js
- **Editor**: Quill

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: MySQL
- **AI**: OpenAI API
- **Security**: JWT, Bcryptjs

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://www.mysql.com/)
- [Angular CLI](https://angular.io/cli) (optional, for global ng commands)

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd skillforge-ai
   ```

2. **Install Dependencies**
   Use the root package script to install dependencies for both frontend and backend:
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=skillforge_db
   JWT_SECRET=your_super_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Database Setup**
   Ensure your MySQL server is running and create the database named in your `.env` file (`skillforge_db`). The tables will be automatically synchronized when the backend starts.
## 🚀 Running the Application

You can start both the frontend and backend simultaneously using the provided batch file or npm script:
### Windows (Quick Start)
Double-click the `run_project.bat` file in the root directory.

### Using NPM
Run the following command in the root directory:
```bash
npm start
```
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```text
├── backend/            # Express.js server & Sequelize models
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Database schemas
│   │   ├── routes/      # API endpoints
│   │   └── server.js    # Entry point
├── frontend/           # Angular application
│   ├── src/
│   │   ├── app/         # Components & services
│   │   └── assets/      # Static files
└── run_project.bat     # Windows startup script
```


