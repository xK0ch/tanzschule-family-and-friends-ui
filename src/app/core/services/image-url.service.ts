import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Builds absolute URLs for image endpoints so they can be used as `<img [src]>`.
 *
 * The generated API client returns image data as a `Blob` — which is useful for downloads
 * but not for binding directly to `<img>`. This service exists purely to produce a string
 * URL the browser can request itself.
 */
@Injectable({ providedIn: 'root' })
export class ImageUrlService {
  newsImage(newsId: string): string {
    return `${environment.apiUrl}/news/${newsId}/image/download`;
  }

  galleryImage(eventId: string, imageId: string): string {
    return `${environment.apiUrl}/gallery-events/${eventId}/images/${imageId}/download`;
  }
}
