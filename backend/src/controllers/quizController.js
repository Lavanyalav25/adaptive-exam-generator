const { Quiz, Question, QuizAttempt, Course } = require('../models');

exports.createQuiz = async (req, res) => {
  const { course_id, title, questions, generated_by_ai } = req.body;
  try {
    const quiz = await Quiz.create({ course_id, title, generated_by_ai });
    const formattedQuestions = questions.map(q => ({
      ...q,
      quiz_id: quiz.id
    }));
    await Question.bulkCreate(formattedQuestions);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create quiz', error: error.message });
  }
};

exports.getQuizzesByCourse = async (req, res) => {
  const { course_id } = req.params;
  try {
    const quizzes = await Quiz.findAll({ where: { course_id }, include: [Question] });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findByPk(id, { include: [Question] });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quiz_id, answers, emotional_feedback } = req.body; 
  console.log('Quiz Submission Request:', { quiz_id, answersCount: answers?.length, emotional_feedback, user: req.user });
  try {
    const questions = await Question.findAll({ where: { quiz_id } });
    if (!questions.length) {
      console.warn('Quiz questions not found for ID:', quiz_id);
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let scoreCount = 0;
    questions.forEach(q => {
      const studentAnswer = answers.find(a => a.question_id === q.id)?.answer;
      if (studentAnswer === q.correct_answer) scoreCount++;
    });

    const finalScore = (scoreCount / questions.length) * 100;
    console.log('Calculated Score:', finalScore);

    const attempt = await QuizAttempt.create({
      quiz_id,
      student_id: req.user.id,
      score: finalScore,
      emotional_feedback
    });

    // Simple Adaptive Logic: Suggest difficulty adjustment
    let recommendation = "Maintain current level";
    if (finalScore > 85) recommendation = "Recommended: Move to ADVANCED";
    else if (finalScore < 40) recommendation = "Recommended: Review BEGINNER content";

    res.status(201).json({ 
      message: 'Quiz submitted successfully', 
      score: finalScore, 
      recommendation,
      attempt 
    });
  } catch (error) {
    console.error('Quiz Submission Error:', error);
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
};

exports.getStudentAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.findAll({
      where: { student_id: req.user.id },
      include: [{ model: Quiz, include: [Course] }]
    });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attempts', error: error.message });
  }
};
