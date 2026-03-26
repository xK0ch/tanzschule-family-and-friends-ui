import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly USERNAME_KEY = 'admin_username';

  readonly isLoggedIn = signal(this.hasToken());
  readonly username = signal(this.getStoredUsername());

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USERNAME_KEY, response.username);
          this.isLoggedIn.set(true);
          this.username.set(response.username);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    this.isLoggedIn.set(false);
    this.username.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}
