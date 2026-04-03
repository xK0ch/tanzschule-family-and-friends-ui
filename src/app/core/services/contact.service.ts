import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  send(request: ContactRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, request);
  }
}
