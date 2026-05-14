const { Course, User, QuizAttempt, Quiz } = require('../models');

exports.createCourse = async (req, res) => {
  const { title, difficulty_level } = req.body;
  console.log('Create Course Request:', { title, difficulty_level, user: req.user });
  try {
    const course = await Course.create({ title, difficulty_level, instructor_id: req.user.id });
    console.log('Course Created:', course.id);
    res.status(201).json(course);
  } catch (error) {
    console.error('Course Creation Error:', error);
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ include: [{ model: User, as: 'instructor', attributes: ['name', 'email'] }] });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Fetch Courses Error:', error);
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, difficulty_level } = req.body;
  console.log('Update Course Request:', { id, title, difficulty_level });
  try {
    const course = await Course.findByPk(id);
    if (!course || course.instructor_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await course.update({ title, difficulty_level });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course || course.instructor_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }
    await course.destroy();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

exports.getStudentInsights = async (req, res) => {
  try {
    const insights = await QuizAttempt.findAll({
      include: [
        { model: Quiz, where: { course_id: req.params.course_id }, include: [Course] },
        { model: User, as: 'student', attributes: ['name', 'email'] }
      ]
    });
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch insights', error: error.message });
  }
};
