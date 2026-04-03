import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected name = '';
  protected email = '';
  protected phone = '';
  protected message = '';
  protected sending = signal(false);

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar,
  ) {}

  protected send(): void {
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) return;
    this.sending.set(true);

    this.contactService.send({
      name: this.name,
      email: this.email,
      phone: this.phone || undefined,
      message: this.message,
    }).subscribe({
      next: () => {
        this.snackBar.open('Ihre Nachricht wurde erfolgreich gesendet!', 'OK', { duration: 5000 });
        this.name = '';
        this.email = '';
        this.phone = '';
        this.message = '';
        this.sending.set(false);
      },
      error: () => {
        this.snackBar.open('Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut.', 'OK', { duration: 5000 });
        this.sending.set(false);
      },
    });
  }
}
