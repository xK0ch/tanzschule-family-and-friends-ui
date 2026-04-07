import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CourseRegistrationRequest, CourseRequest, CourseResponse } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CourseRequest): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(this.baseUrl, request);
  }

  update(id: number, request: CourseRequest): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  register(courseId: number, request: CourseRegistrationRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${courseId}/register`, request);
  }
}
