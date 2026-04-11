import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { GalleryEventResponse } from '../../core/models/gallery-event.model';
import { GalleryEventService } from '../../core/services/gallery-event.service';

@Component({
  selector: 'app-admin-gallery',
  imports: [DatePipe, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDividerModule],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.scss',
})
export class AdminGallery implements OnInit {
  protected events = signal<GalleryEventResponse[]>([]);
  protected showNewForm = signal(false);
  protected editingId = signal<string | null>(null);
  protected expandedEventId = signal<string | null>(null);

  protected newName = '';
  protected newDate = '';
  protected editName = '';
  protected editDate = '';

  constructor(
    private galleryEventService: GalleryEventService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  protected loadEvents(): void {
    this.galleryEventService.getAll().subscribe({
      next: (events) => this.events.set(events),
      error: () => this.showMessage('Fehler beim Laden der Events.'),
    });
  }

  protected toggleNewForm(): void {
    this.showNewForm.set(!this.showNewForm());
    this.newName = '';
    this.newDate = '';
  }

  protected createEvent(): void {
    if (!this.newName.trim() || !this.newDate) return;
    this.galleryEventService.create({ name: this.newName, date: this.newDate }).subscribe({
      next: () => {
        this.showMessage('Event erstellt.');
        this.toggleNewForm();
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Erstellen.'),
    });
  }

  protected startEdit(event: GalleryEventResponse): void {
    this.editingId.set(event.id);
    this.editName = event.name;
    this.editDate = event.date;
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }

  protected saveEvent(event: GalleryEventResponse): void {
    if (!this.editName.trim() || !this.editDate) return;
    this.galleryEventService.update(event.id, { name: this.editName, date: this.editDate }).subscribe({
      next: () => {
        this.showMessage('Event aktualisiert.');
        this.editingId.set(null);
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Speichern.'),
    });
  }

  protected deleteEvent(event: GalleryEventResponse): void {
    if (!confirm(`Event "${event.name}" und alle zugehörigen Bilder wirklich löschen?`)) return;
    this.galleryEventService.delete(event.id).subscribe({
      next: () => {
        this.showMessage('Event gelöscht.');
        if (this.expandedEventId() === event.id) {
          this.expandedEventId.set(null);
        }
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected toggleExpand(eventId: string): void {
    this.expandedEventId.set(this.expandedEventId() === eventId ? null : eventId);
  }

  protected getImageUrl(eventId: string, imageId: string): string {
    return this.galleryEventService.getImageDownloadUrl(eventId, imageId);
  }

  protected onFilesSelected(event: GalleryEventResponse, fileEvent: Event): void {
    const input = fileEvent.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    this.galleryEventService.uploadImages(event.id, files).subscribe({
      next: () => {
        const count = files.length;
        this.showMessage(count === 1 ? 'Bild hochgeladen.' : `${count} Bilder hochgeladen.`);
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Hochladen.'),
    });

    input.value = '';
  }

  protected deleteImage(event: GalleryEventResponse, imageId: string): void {
    if (!confirm('Bild wirklich löschen?')) return;
    this.galleryEventService.deleteImage(event.id, imageId).subscribe({
      next: () => {
        this.showMessage('Bild gelöscht.');
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected moveImageUp(event: GalleryEventResponse, index: number): void {
    if (index <= 0) return;
    const ids = event.images.map((img) => img.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    this.reorderImages(event.id, ids);
  }

  protected moveImageDown(event: GalleryEventResponse, index: number): void {
    const ids = event.images.map((img) => img.id);
    if (index >= ids.length - 1) return;
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    this.reorderImages(event.id, ids);
  }

  private reorderImages(eventId: string, ids: string[]): void {
    this.galleryEventService.reorderImages(eventId, ids).subscribe({
      next: () => this.loadEvents(),
      error: () => this.showMessage('Fehler beim Sortieren.'),
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
