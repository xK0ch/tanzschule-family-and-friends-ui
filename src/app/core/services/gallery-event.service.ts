import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryEventRequest, GalleryEventResponse, ImageResponse } from '../models/gallery-event.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GalleryEventService {
  private readonly baseUrl = `${environment.apiUrl}/gallery-events`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<GalleryEventResponse[]> {
    return this.http.get<GalleryEventResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<GalleryEventResponse> {
    return this.http.get<GalleryEventResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: GalleryEventRequest): Observable<GalleryEventResponse> {
    return this.http.post<GalleryEventResponse>(this.baseUrl, request);
  }

  update(id: string, request: GalleryEventRequest): Observable<GalleryEventResponse> {
    return this.http.put<GalleryEventResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadImages(eventId: string, files: File[]): Observable<ImageResponse[]> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    return this.http.post<ImageResponse[]>(`${this.baseUrl}/${eventId}/images`, formData);
  }

  deleteImage(eventId: string, imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}/images/${imageId}`);
  }

  reorderImages(eventId: string, orderedIds: string[]): Observable<ImageResponse[]> {
    return this.http.put<ImageResponse[]>(`${this.baseUrl}/${eventId}/images/reorder`, orderedIds);
  }

  getImageDownloadUrl(eventId: string, imageId: string): string {
    return `${this.baseUrl}/${eventId}/images/${imageId}/download`;
  }
}
