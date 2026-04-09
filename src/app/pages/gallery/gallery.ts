import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GalleryEventResponse, ImageResponse } from '../../core/models/gallery-event.model';
import { GalleryEventService } from '../../core/services/gallery-event.service';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  protected events = signal<GalleryEventResponse[]>([]);
  protected loading = signal(true);
  protected error = signal(false);
  protected lightboxImage = signal<{ eventId: string; image: ImageResponse } | null>(null);

  constructor(private galleryEventService: GalleryEventService) {}

  ngOnInit(): void {
    this.galleryEventService.getAll().subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected getImageUrl(eventId: string, imageId: string): string {
    return this.galleryEventService.getImageDownloadUrl(eventId, imageId);
  }

  protected openLightbox(eventId: string, image: ImageResponse): void {
    this.lightboxImage.set({ eventId, image });
  }

  protected closeLightbox(): void {
    this.lightboxImage.set(null);
  }
}
