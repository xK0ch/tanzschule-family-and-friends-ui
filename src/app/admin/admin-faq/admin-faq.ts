import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FaqService, FaqResponse } from '../../../api/src';

@Component({
  selector: 'app-admin-faq',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-faq.html',
  styleUrl: './admin-faq.scss',
})
export class AdminFaq implements OnInit {
  private readonly faqService = inject(FaqService);
  private readonly snackBar = inject(MatSnackBar);

  protected faqs = signal<FaqResponse[]>([]);
  protected editingId = signal<string | null>(null);
  protected showNewForm = signal(false);

  protected newQuestion = '';
  protected newAnswer = '';
  protected editQuestion = '';
  protected editAnswer = '';

  ngOnInit(): void {
    this.loadFaqs();
  }

  protected loadFaqs(): void {
    this.faqService.getAllFaqs().subscribe({
      next: (faqs) => this.faqs.set(faqs),
      error: () => this.showMessage('Fehler beim Laden der FAQs.'),
    });
  }

  protected toggleNewForm(): void {
    this.showNewForm.set(!this.showNewForm());
    this.newQuestion = '';
    this.newAnswer = '';
  }

  protected createFaq(): void {
    if (!this.newQuestion.trim() || !this.newAnswer.trim()) return;

    const displayOrder = this.faqs().length;
    this.faqService
      .createFaq({
        body: { question: this.newQuestion, answer: this.newAnswer, displayOrder },
      })
      .subscribe({
        next: () => {
          this.showMessage('FAQ erstellt.');
          this.toggleNewForm();
          this.loadFaqs();
        },
        error: () => this.showMessage('Fehler beim Erstellen.'),
      });
  }

  protected startEdit(faq: FaqResponse): void {
    this.editingId.set(faq.id);
    this.editQuestion = faq.question;
    this.editAnswer = faq.answer;
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }

  protected saveFaq(faq: FaqResponse): void {
    if (!this.editQuestion.trim() || !this.editAnswer.trim()) return;

    this.faqService
      .updateFaq({
        id: faq.id,
        body: {
          question: this.editQuestion,
          answer: this.editAnswer,
          displayOrder: faq.displayOrder,
        },
      })
      .subscribe({
        next: () => {
          this.showMessage('FAQ aktualisiert.');
          this.editingId.set(null);
          this.loadFaqs();
        },
        error: () => this.showMessage('Fehler beim Speichern.'),
      });
  }

  protected deleteFaq(faq: FaqResponse): void {
    if (!confirm(`FAQ "${faq.question}" wirklich löschen?`)) return;

    this.faqService.deleteFaq({ id: faq.id }).subscribe({
      next: () => {
        this.showMessage('FAQ gelöscht.');
        this.loadFaqs();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected moveUp(index: number): void {
    if (index <= 0) return;
    const ids = this.faqs().map((f) => f.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    this.reorder(ids);
  }

  protected moveDown(index: number): void {
    const ids = this.faqs().map((f) => f.id);
    if (index >= ids.length - 1) return;
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    this.reorder(ids);
  }

  private reorder(ids: string[]): void {
    this.faqService.reorderFaqs({ body: ids }).subscribe({
      next: () => this.loadFaqs(),
      error: () => this.showMessage('Fehler beim Sortieren.'),
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
