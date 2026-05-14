const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const quizController = require('../controllers/quizController');
const aiController = require('../controllers/aiController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', authMiddleware, authController.getProfile);

// Course Routes (RBAC)
router.post('/courses', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), courseController.createCourse);
router.get('/courses', authMiddleware, courseController.getAllCourses);
router.get('/courses/:course_id/insights', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), courseController.getStudentInsights);
router.put('/courses/:id', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), courseController.updateCourse);
router.delete('/courses/:id', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), courseController.deleteCourse);

// Quiz Routes
router.post('/quizzes/submit', authMiddleware, quizController.submitQuiz);
router.get('/quizzes/attempts', authMiddleware, quizController.getStudentAttempts);
router.post('/quizzes', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), quizController.createQuiz);
router.get('/quizzes/:id', authMiddleware, quizController.getQuizById);
router.get('/quizzes/course/:course_id', authMiddleware, quizController.getQuizzesByCourse);

// AI Routes
router.post('/ai/generate-quiz', authMiddleware, roleMiddleware(['INSTRUCTOR', 'ADMIN']), aiController.generateQuiz);

module.exports = router;
