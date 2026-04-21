import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NewsService, NewsResponse } from '../../../api/src';
import { ImageUrlService } from '../../core/services/image-url.service';

@Component({
  selector: 'app-admin-news',
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
  templateUrl: './admin-news.html',
  styleUrl: './admin-news.scss',
})
export class AdminNews implements OnInit {
  private readonly newsService = inject(NewsService);
  protected readonly imageUrls = inject(ImageUrlService);
  private readonly snackBar = inject(MatSnackBar);

  protected newsList = signal<NewsResponse[]>([]);
  protected editingId = signal<string | null>(null);
  protected showNewForm = signal(false);

  protected newTitle = '';
  protected newDescription = '';
  protected editTitle = '';
  protected editDescription = '';

  ngOnInit(): void {
    this.loadNews();
  }

  protected loadNews(): void {
    this.newsService.getAll().subscribe({
      next: (news) => this.newsList.set(news),
      error: () => this.showMessage('Fehler beim Laden der Neuigkeiten.'),
    });
  }

  protected toggleNewForm(): void {
    this.showNewForm.set(!this.showNewForm());
    this.newTitle = '';
    this.newDescription = '';
  }

  protected createNews(): void {
    if (!this.newTitle.trim() || !this.newDescription.trim()) return;

    const displayOrder = this.newsList().length;
    this.newsService
      .create({
        body: {
          title: this.newTitle,
          description: this.newDescription,
          displayOrder,
        },
      })
      .subscribe({
        next: () => {
          this.showMessage('Neuigkeit erstellt.');
          this.toggleNewForm();
          this.loadNews();
        },
        error: () => this.showMessage('Fehler beim Erstellen.'),
      });
  }

  protected startEdit(news: NewsResponse): void {
    this.editingId.set(news.id);
    this.editTitle = news.title;
    this.editDescription = news.description;
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }

  protected saveNews(news: NewsResponse): void {
    if (!this.editTitle.trim() || !this.editDescription.trim()) return;

    this.newsService
      .update({
        id: news.id,
        body: {
          title: this.editTitle,
          description: this.editDescription,
          displayOrder: news.displayOrder,
        },
      })
      .subscribe({
        next: () => {
          this.showMessage('Neuigkeit aktualisiert.');
          this.editingId.set(null);
          this.loadNews();
        },
        error: () => this.showMessage('Fehler beim Speichern.'),
      });
  }

  protected deleteNews(news: NewsResponse): void {
    if (!confirm(`Neuigkeit "${news.title}" wirklich löschen?`)) return;

    this.newsService.delete({ id: news.id }).subscribe({
      next: () => {
        this.showMessage('Neuigkeit gelöscht.');
        this.loadNews();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected onFileSelected(event: Event, news: NewsResponse): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.newsService.uploadImage({ id: news.id, body: { file } }).subscribe({
      next: () => {
        this.showMessage('Bild hochgeladen.');
        this.loadNews();
      },
      error: () => this.showMessage('Fehler beim Hochladen.'),
    });

    input.value = '';
  }

  protected removeImage(news: NewsResponse): void {
    if (!confirm('Bild wirklich entfernen?')) return;

    this.newsService.deleteImage({ id: news.id }).subscribe({
      next: () => {
        this.showMessage('Bild entfernt.');
        this.loadNews();
      },
      error: () => this.showMessage('Fehler beim Entfernen.'),
    });
  }

  protected moveUp(index: number): void {
    if (index <= 0) return;
    const ids = this.newsList().map((n) => n.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    this.reorder(ids);
  }

  protected moveDown(index: number): void {
    const ids = this.newsList().map((n) => n.id);
    if (index >= ids.length - 1) return;
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    this.reorder(ids);
  }

  private reorder(ids: string[]): void {
    this.newsService.reorder({ body: ids }).subscribe({
      next: () => this.loadNews(),
      error: () => this.showMessage('Fehler beim Sortieren.'),
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
