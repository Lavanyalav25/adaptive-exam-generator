import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/courses';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCourses() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createCourse(courseData: any) {
    return this.http.post(this.apiUrl, courseData, { headers: this.getHeaders() });
  }

  updateCourse(id: number, courseData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, courseData, { headers: this.getHeaders() });
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getStudentInsights(courseId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/insights`, { headers: this.getHeaders() });
  }
}
