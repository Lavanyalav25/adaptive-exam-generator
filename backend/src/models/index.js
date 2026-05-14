const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN'), defaultValue: 'STUDENT' }
}, { tableName: 'users' });

const Course = sequelize.define('Course', {
  title: { type: DataTypes.STRING(100), allowNull: false },
  difficulty_level: { type: DataTypes.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED'), defaultValue: 'BEGINNER' }
}, { tableName: 'courses' });

const Quiz = sequelize.define('Quiz', {
  title: { type: DataTypes.STRING(100), allowNull: false },
  generated_by_ai: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'quizzes' });

const Question = sequelize.define('Question', {
  question_text: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false },
  correct_answer: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'questions' });

const QuizAttempt = sequelize.define('QuizAttempt', {
  score: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  attempt_time: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  emotional_feedback: { type: DataTypes.ENUM('HAPPY', 'NEUTRAL', 'STRESSED'), allowNull: true }
}, { tableName: 'quiz_attempts' });

// Associations
User.hasMany(Course, { foreignKey: 'instructor_id' });
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructor_id' });

Course.hasMany(Quiz, { foreignKey: 'course_id' });
Quiz.belongsTo(Course, { foreignKey: 'course_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(QuizAttempt, { foreignKey: 'quiz_id' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quiz_id' });

User.hasMany(QuizAttempt, { foreignKey: 'student_id' });
QuizAttempt.belongsTo(User, { as: 'student', foreignKey: 'student_id' });

module.exports = { sequelize, User, Course, Quiz, Question, QuizAttempt };
