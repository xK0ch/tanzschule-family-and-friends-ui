import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GalleryEventsService, GalleryEventResponse } from '../../../api/src';
import { ImageUrlService } from '../../core/services/image-url.service';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe, RouterLink, MatCardModule, MatIconModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  private readonly galleryEventsService = inject(GalleryEventsService);
  private readonly imageUrls = inject(ImageUrlService);

  protected events = signal<GalleryEventResponse[]>([]);
  protected loading = signal(true);
  protected error = signal(false);

  ngOnInit(): void {
    this.galleryEventsService.getAll1().subscribe({
      next: (events) => {
        this.events.set(events.filter((e) => e.images.length > 0));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected getCoverUrl(event: GalleryEventResponse): string {
    return this.imageUrls.galleryImage(event.id, event.images[0].id);
  }
}
