import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FaqRequest, FaqResponse } from '../models/faq.model';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private readonly baseUrl = `${environment.apiUrl}/faqs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FaqResponse[]> {
    return this.http.get<FaqResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<FaqResponse> {
    return this.http.get<FaqResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: FaqRequest): Observable<FaqResponse> {
    return this.http.post<FaqResponse>(this.baseUrl, request);
  }

  update(id: string, request: FaqRequest): Observable<FaqResponse> {
    return this.http.put<FaqResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  reorder(orderedIds: string[]): Observable<FaqResponse[]> {
    return this.http.put<FaqResponse[]>(`${this.baseUrl}/reorder`, orderedIds);
  }
}
