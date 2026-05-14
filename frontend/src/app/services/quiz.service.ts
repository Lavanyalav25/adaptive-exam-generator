import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/quizzes';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getQuizzesByCourse(courseId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`, { headers: this.getHeaders() });
  }

  getQuizById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  submitQuiz(quizData: any) {
    return this.http.post(`${this.apiUrl}/submit`, quizData, { headers: this.getHeaders() });
  }

  getStudentAttempts() {
    return this.http.get<any[]>(`${this.apiUrl}/attempts`, { headers: this.getHeaders() });
  }

  createQuiz(quizData: any) {
    return this.http.post(this.apiUrl, quizData, { headers: this.getHeaders() });
  }
}
