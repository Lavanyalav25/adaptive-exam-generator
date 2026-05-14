import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { AiService } from '../../../services/ai.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.html',
  styles: [`
    .dashboard-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
    .course-form { margin-bottom: 2rem; }
    .ai-gen-btn { background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: white !important; }
  `]
})
export class DashboardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private aiService = inject(AiService);
  private quizService = inject(QuizService);

  courses: any[] = [];
  selectedCourse: any = null;
  showManualForm = false;
  showInsights = false;
  insights: any[] = [];

  courseForm = this.fb.group({
    title: ['', Validators.required],
    difficulty_level: ['BEGINNER', Validators.required]
  });

  manualQuizForm = this.fb.group({
    quizTitle: ['', Validators.required],
    questions: this.fb.array([])
  });

  get questions() {
    return this.manualQuizForm.get('questions') as FormArray;
  }

  ngOnInit() {
    this.loadCourses();
  }

  viewInsights(course: any) {
    this.selectedCourse = course;
    this.showInsights = true;
    this.courseService.getStudentInsights(course.id).subscribe({
      next: (res) => this.insights = res,
      error: (err) => {
        console.error('Failed to load insights:', err);
        alert('Could not load student results.');
      }
    });
  }

  loadCourses() {
    console.log('Loading courses...');
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        console.log('Courses loaded:', res);
        this.courses = res;
      },
      error: (err) => {
        console.error('Failed to load courses:', err);
        alert('Error loading courses. Please check if backend is running.');
      }
    });
  }

  onCreateCourse() {
    if (this.courseForm.valid) {
      console.log('Creating course:', this.courseForm.value);
      this.courseService.createCourse(this.courseForm.value).subscribe({
        next: (res) => {
          console.log('Course created successfully:', res);
          this.courseForm.reset({ difficulty_level: 'BEGINNER' });
          this.loadCourses();
          alert('Course created successfully!');
        },
        error: (err) => {
          console.error('Course creation failed:', err);
          alert('Failed to create course: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  openManualQuizForm(course: any) {
    this.selectedCourse = course;
    this.showManualForm = true;
    this.manualQuizForm.reset({ quizTitle: `Quiz for ${course.title}` });
    this.questions.clear();
    this.addQuestion(); // Start with one question
  }

  addQuestion() {
    if (this.questions.length >= 10) {
      alert('Maximum 10 questions allowed per quiz.');
      return;
    }
    const questionGroup = this.fb.group({
      question_text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correct_answer: ['', Validators.required]
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  saveManualQuiz() {
    if (this.manualQuizForm.valid) {
      const quizData = {
        course_id: this.selectedCourse.id,
        title: this.manualQuizForm.value.quizTitle,
        generated_by_ai: false,
        questions: this.manualQuizForm.value.questions
      };
      
      this.quizService.createQuiz(quizData).subscribe({
        next: () => {
          alert('Manual Quiz Created Successfully!');
          this.showManualForm = false;
        },
        error: (err) => alert('Failed to save quiz: ' + err.message)
      });
    }
  }

  generateAiQuiz(course: any) {
    console.log('Generating AI Quiz for:', course.title);
    const params = { topic: course.title, difficulty_level: course.difficulty_level };
    this.aiService.generateQuiz(params).subscribe({
      next: (questions: any) => {
        console.log('AI Questions received:', questions);
        const quizData = {
          course_id: course.id,
          title: `AI Generated: ${course.title}`,
          generated_by_ai: true,
          questions: questions
        };
        this.quizService.createQuiz(quizData).subscribe({
          next: () => {
            console.log('Quiz saved successfully');
            alert('AI Quiz Generated and Saved Successfully!');
          },
          error: (err) => {
            console.error('Failed to save quiz:', err);
            alert('Failed to save the generated quiz.');
          }
        });
      },
      error: (err) => {
        console.error('AI Generation failed:', err);
        alert('AI Generation failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
