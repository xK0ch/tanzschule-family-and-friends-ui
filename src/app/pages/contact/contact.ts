import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../../api/src';

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
  protected touched: Record<string, boolean> = {};

  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly phonePattern = /^[+]?[\d\s()/-]{6,20}$/;

  private readonly contactService = inject(ContactService);
  private readonly snackBar = inject(MatSnackBar);

  protected isEmailValid(): boolean {
    return this.emailPattern.test(this.email);
  }

  protected isPhoneValid(): boolean {
    return this.phonePattern.test(this.phone.trim());
  }

  protected isFormValid(): boolean {
    return this.name.trim().length > 0
      && this.email.trim().length > 0
      && this.isEmailValid()
      && this.message.trim().length > 0
      && (!this.phone.trim() || this.isPhoneValid());
  }

  protected send(): void {
    if (!this.isFormValid()) return;
    this.sending.set(true);

    this.contactService.sendMessage({
      body: {
        name: this.name,
        email: this.email,
        phone: this.phone || undefined,
        message: this.message,
      },
    }).subscribe({
      next: () => {
        this.snackBar.open('Ihre Nachricht wurde erfolgreich gesendet!', 'OK', { duration: 5000 });
        this.name = '';
        this.email = '';
        this.phone = '';
        this.message = '';
        this.sending.set(false);
        this.touched = {};
      },
      error: () => {
        this.snackBar.open('Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut.', 'OK', { duration: 5000 });
        this.sending.set(false);
      },
    });
  }
}
