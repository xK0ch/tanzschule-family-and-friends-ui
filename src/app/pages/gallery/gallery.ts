import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GalleryEventResponse } from '../../core/models/gallery-event.model';
import { GalleryEventService } from '../../core/services/gallery-event.service';

@Component({
  selector: 'app-gallery',
  imports: [DatePipe, RouterLink, MatCardModule, MatIconModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  protected events = signal<GalleryEventResponse[]>([]);
  protected loading = signal(true);
  protected error = signal(false);

  constructor(private galleryEventService: GalleryEventService) {}

  ngOnInit(): void {
    this.galleryEventService.getAll().subscribe({
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
    return this.galleryEventService.getImageDownloadUrl(event.id, event.images[0].id);
  }
}
