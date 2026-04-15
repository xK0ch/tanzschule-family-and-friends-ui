import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewsRequest, NewsResponse } from '../models/news.model';
import { ImageResponse } from '../models/gallery-event.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly baseUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<NewsResponse[]> {
    return this.http.get<NewsResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: NewsRequest): Observable<NewsResponse> {
    return this.http.post<NewsResponse>(this.baseUrl, request);
  }

  update(id: string, request: NewsRequest): Observable<NewsResponse> {
    return this.http.put<NewsResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadImage(newsId: string, file: File): Observable<ImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageResponse>(
      `${this.baseUrl}/${newsId}/image`,
      formData
    );
  }

  deleteImage(newsId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${newsId}/image`);
  }

  getImageUrl(newsId: string): string {
    return `${this.baseUrl}/${newsId}/image/download`;
  }

  reorder(orderedIds: string[]): Observable<NewsResponse[]> {
    return this.http.put<NewsResponse[]>(`${this.baseUrl}/reorder`, orderedIds);
  }
}
