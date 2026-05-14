import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatRadioModule, 
    MatProgressBarModule, 
    MatIconModule,
    FormsModule
  ],
  templateUrl: './take-quiz.html',
  styles: [`
    .quiz-container { padding: 2rem; max-width: 800px; margin: 0 auto; min-height: 80vh; display: flex; flex-direction: column; justify-content: center; }
    .timer { font-size: 1.5rem; font-weight: 700; color: #ef4444; margin-bottom: 1rem; text-align: right; }
    .question-text { font-size: 1.25rem; margin-bottom: 2rem; color: white; }
    .progress { margin-bottom: 2rem; border-radius: 4px; height: 8px; }
    .options-group { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; }
    .option-container { background: rgba(255, 255, 255, 0.07); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.2s; cursor: pointer; }
    .option-container:hover { background: rgba(255, 255, 255, 0.12); border-color: #3b82f6; }
    .full-width-radio { width: 100%; padding: 0.5rem 1rem; }
    .option-text { font-size: 1.1rem; color: #e2e8f0; }
    .footer { margin-top: 3rem; display: flex; justify-content: space-between; }
  `]
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);
  private router = inject(Router);

  quiz: any;
  questions: any[] = [];
  currentIndex = 0;
  selectedAnswers: any[] = [];
  timeLeft = 300; // 5 minutes
  timerInterval: any;
  isFinished = false;
  score: number = 0;
  recommendation: string = '';
  emotionalFeedback: string | null = null;

  ngOnInit() {
    const quizId = this.route.snapshot.params['id'];
    this.quizService.getQuizById(quizId).subscribe({
      next: (res: any) => {
        this.quiz = res;
        this.questions = res.Questions || [];
        // Ensure options are parsed if they come as strings
        this.questions.forEach(q => {
          if (typeof q.options === 'string') {
            try { q.options = JSON.parse(q.options); } catch(e) {}
          }
          console.log('Parsed options for question:', q.options);
        });
        console.log('Quiz loaded with questions:', this.questions);
        if (this.questions.length > 0) {
          this.selectedAnswers = new Array(this.questions.length).fill(null);
          this.startTimer();
        } else {
          alert('This quiz has no questions.');
          this.router.navigate(['/student/dashboard']);
        }
      },
      error: (err) => {
        console.error('Failed to load quiz:', err);
        alert('Could not load the quiz. Please try again.');
        this.router.navigate(['/student/dashboard']);
      }
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
      else this.submitQuiz();
    }, 1000);
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  submitQuiz() {
    if (!this.quiz) return;
    
    clearInterval(this.timerInterval);
    const answers = this.questions.map((q, i) => ({
      question_id: q.id,
      answer: this.selectedAnswers[i]
    }));
    
    this.quizService.submitQuiz({ 
      quiz_id: this.quiz.id, 
      answers, 
      emotional_feedback: this.emotionalFeedback 
    }).subscribe({
      next: (res: any) => {
        this.score = res.score;
        this.recommendation = res.recommendation;
        this.isFinished = true;
      },
      error: (err) => {
        console.error('Quiz submission failed:', err);
        alert('Failed to submit quiz: ' + (err.error?.message || 'Check your internet connection or backend server.'));
      }
    });
  }

  finish() {
    this.router.navigate(['/student/dashboard']);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}
