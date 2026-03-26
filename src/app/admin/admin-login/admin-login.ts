import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  protected username = '';
  protected password = '';
  protected hidePassword = signal(true);
  protected errorMessage = signal('');
  protected loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/faq']);
    }
  }

  protected onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage.set('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/admin/faq']);
      },
      error: () => {
        this.errorMessage.set('Ungültiger Benutzername oder Passwort.');
        this.loading.set(false);
      },
    });
  }
}
