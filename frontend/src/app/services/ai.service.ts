import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/ai';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  generateQuiz(quizParams: any) {
    return this.http.post(`${this.apiUrl}/generate-quiz`, quizParams, { headers: this.getHeaders() });
  }
}
