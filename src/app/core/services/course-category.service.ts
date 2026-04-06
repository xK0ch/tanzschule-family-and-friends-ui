import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CourseCategoryRequest, CourseCategoryResponse } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseCategoryService {
  private readonly baseUrl = `${environment.apiUrl}/course-categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseCategoryResponse[]> {
    return this.http.get<CourseCategoryResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<CourseCategoryResponse> {
    return this.http.get<CourseCategoryResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CourseCategoryRequest): Observable<CourseCategoryResponse> {
    return this.http.post<CourseCategoryResponse>(this.baseUrl, request);
  }

  update(id: number, request: CourseCategoryRequest): Observable<CourseCategoryResponse> {
    return this.http.put<CourseCategoryResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  reorder(orderedIds: number[]): Observable<CourseCategoryResponse[]> {
    return this.http.put<CourseCategoryResponse[]>(`${this.baseUrl}/reorder`, orderedIds);
  }
}
