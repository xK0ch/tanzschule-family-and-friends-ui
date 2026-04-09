import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../core/services/course.service';
import { CourseRegistrationRequest, CourseResponse } from '../../core/models/course.model';

@Component({
  selector: 'app-course-detail',
  imports: [
    RouterLink, DatePipe, DecimalPipe, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatRadioModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatDividerModule, MatSnackBarModule,
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail {
  protected course = signal<CourseResponse | null>(null);
  protected loading = signal(true);
  protected sending = signal(false);
  protected touched: Record<string, boolean> = {};

  // Form fields
  protected selectedTariff = '';
  protected withPartner = false;
  protected partnerFirstName = '';
  protected partnerLastName = '';
  protected salutation = '';
  protected firstName = '';
  protected lastName = '';
  protected birthDate = '';
  protected street = '';
  protected city = '';
  protected phone = '';
  protected mobile = '';
  protected email = '';
  protected remark = '';
  protected directDebit = false;
  protected accountHolder = '';
  protected iban = '';
  protected bic = '';
  protected termsAccepted = false;
  protected showAgbDialog = signal(false);

  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly phonePattern = /^[+]?[\d\s()/-]{6,20}$/;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.courseService.getById(id).subscribe({
      next: (course) => {
        this.course.set(course);
        if (course.tariffs.length > 0) {
          this.selectedTariff = course.tariffs[0].name;
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected isEmailValid(): boolean {
    return this.emailPattern.test(this.email);
  }

  protected isPhoneValid(value: string): boolean {
    return this.phonePattern.test(value.trim());
  }

  protected isFormValid(): boolean {
    return this.salutation.trim().length > 0
      && this.firstName.trim().length > 0
      && this.lastName.trim().length > 0
      && this.birthDate.trim().length > 0
      && this.street.trim().length > 0
      && this.city.trim().length > 0
      && this.phone.trim().length > 0
      && this.isPhoneValid(this.phone)
      && (!this.mobile.trim() || this.isPhoneValid(this.mobile))
      && this.email.trim().length > 0
      && this.isEmailValid()
      && this.selectedTariff.length > 0
      && (!this.directDebit || (this.accountHolder.trim().length > 0 && this.iban.trim().length > 0))
      && this.termsAccepted;
  }

  protected submit(): void {
    if (!this.isFormValid() || !this.course()) return;
    this.sending.set(true);

    const request: CourseRegistrationRequest = {
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      phone: this.phone,
      mobile: this.mobile || undefined,
      email: this.email,
      remark: this.remark || undefined,
      tariffName: this.selectedTariff,
      withPartner: this.withPartner,
      partnerFirstName: this.withPartner ? this.partnerFirstName || undefined : undefined,
      partnerLastName: this.withPartner ? this.partnerLastName || undefined : undefined,
      directDebit: this.directDebit,
      accountHolder: this.directDebit ? this.accountHolder || undefined : undefined,
      iban: this.directDebit ? this.iban || undefined : undefined,
      bic: this.directDebit ? this.bic || undefined : undefined,
    };

    this.courseService.register(this.course()!.id, request).subscribe({
      next: () => {
        this.snackBar.open('Ihre Anmeldung wurde erfolgreich gesendet!', 'OK', { duration: 5000 });
        this.resetForm();
        this.sending.set(false);
      },
      error: () => {
        this.snackBar.open('Die Anmeldung konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut.', 'OK', { duration: 5000 });
        this.sending.set(false);
      },
    });
  }

  protected openAgb(event: Event): void {
    event.preventDefault();
    this.showAgbDialog.set(true);
  }

  protected closeAgb(): void {
    this.showAgbDialog.set(false);
  }

  private resetForm(): void {
    this.salutation = '';
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.street = '';
    this.city = '';
    this.phone = '';
    this.mobile = '';
    this.email = '';
    this.remark = '';
    this.withPartner = false;
    this.partnerFirstName = '';
    this.partnerLastName = '';
    this.directDebit = false;
    this.accountHolder = '';
    this.iban = '';
    this.bic = '';
    this.termsAccepted = false;
    this.touched = {};
    if (this.course() && this.course()!.tariffs.length > 0) {
      this.selectedTariff = this.course()!.tariffs[0].name;
    }
  }
}
