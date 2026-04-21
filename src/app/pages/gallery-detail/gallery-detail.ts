import { Component, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryEventsService, GalleryEventResponse } from '../../../api/src';
import { ImageUrlService } from '../../core/services/image-url.service';

@Component({
  selector: 'app-gallery-detail',
  imports: [DatePipe, RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './gallery-detail.html',
  styleUrl: './gallery-detail.scss',
})
export class GalleryDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly galleryEventsService = inject(GalleryEventsService);
  private readonly imageUrls = inject(ImageUrlService);

  protected event = signal<GalleryEventResponse | null>(null);
  protected loading = signal(true);
  protected lightboxIndex = signal<number | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.galleryEventsService.getById1({ id }).subscribe({
      next: (event) => {
        this.event.set(event);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected getImageUrl(imageId: string): string {
    return this.imageUrls.galleryImage(this.event()!.id, imageId);
  }

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
  }

  protected closeLightbox(): void {
    this.lightboxIndex.set(null);
  }

  protected previousImage(event: Event): void {
    event.stopPropagation();
    const current = this.lightboxIndex();
    if (current === null) return;
    const total = this.event()!.images.length;
    this.lightboxIndex.set((current - 1 + total) % total);
  }

  protected nextImage(event: Event): void {
    event.stopPropagation();
    const current = this.lightboxIndex();
    if (current === null) return;
    const total = this.event()!.images.length;
    this.lightboxIndex.set((current + 1) % total);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.previousImage(event);
    if (event.key === 'ArrowRight') this.nextImage(event);
  }
}
