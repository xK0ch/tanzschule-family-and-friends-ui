import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CourseCategoryRequest, CourseCategoryResponse } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseCategoryService {
  private readonly baseUrl = `${environment.apiUrl}/course-categories`;

  constructor(private http: HttpClient) {}

  getAll(ids?: string[]): Observable<CourseCategoryResponse[]> {
    if (ids && ids.length > 0) {
      const params = ids.map((id) => `ids=${id}`).join('&');
      return this.http.get<CourseCategoryResponse[]>(`${this.baseUrl}?${params}`);
    }
    return this.http.get<CourseCategoryResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<CourseCategoryResponse> {
    return this.http.get<CourseCategoryResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CourseCategoryRequest): Observable<CourseCategoryResponse> {
    return this.http.post<CourseCategoryResponse>(this.baseUrl, request);
  }

  update(id: string, request: CourseCategoryRequest): Observable<CourseCategoryResponse> {
    return this.http.put<CourseCategoryResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  reorder(orderedIds: string[]): Observable<CourseCategoryResponse[]> {
    return this.http.put<CourseCategoryResponse[]>(`${this.baseUrl}/reorder`, orderedIds);
  }
}
