import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../../services/course.service';
import { QuizService } from '../../../services/quiz.service';
import { AuthService } from '../../../services/auth.service';
import { PerformanceChartComponent } from '../../../shared/components/performance-chart/performance-chart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressBarModule, 
    MatIconModule,
    PerformanceChartComponent
  ],
  templateUrl: './dashboard.html',
  styles: [`
    .dashboard-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .header { margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .chart-card { grid-column: span 2; }
    .course-card { transition: transform 0.3s; }
    .course-card:hover { transform: translateY(-5px); }
  `]
})
export class DashboardComponent implements OnInit {
  private courseService = inject(CourseService);
  private quizService = inject(QuizService);
  public authService = inject(AuthService);

  courses: any[] = [];
  attempts: any[] = [];
  chartData: any[] = [];
  private router = inject(Router);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.courseService.getAllCourses().subscribe(res => this.courses = res);
    this.quizService.getStudentAttempts().subscribe({
      next: (res) => {
        console.log('Loaded attempts for dashboard:', res);
        this.attempts = res;
        this.chartData = res.map((a: any) => ({
          label: a.Quiz?.title || 'Quiz',
          value: Number(a.score)
        }));
      },
      error: (err) => {
        console.error('Failed to load attempts:', err);
      }
    });
  }

  startQuiz(courseId: number) {
    this.quizService.getQuizzesByCourse(courseId).subscribe({
      next: (quizzes) => {
        if (quizzes.length > 0) {
          this.router.navigate(['/student/quiz', quizzes[0].id]);
        } else {
          alert('No quiz available for this course yet. Ask your instructor to create one!');
        }
      },
      error: (err) => {
        console.error('Failed to fetch quizzes:', err);
        alert('An error occurred while fetching the quiz. Please check if the backend is running.');
      }
    });
  }
}
