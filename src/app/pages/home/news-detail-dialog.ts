import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewsResponse } from '../../../api/src';

export interface NewsDetailDialogData {
  news: NewsResponse;
  imageUrl: string | null;
}

@Component({
  selector: 'app-news-detail-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="news-dialog">
      <button mat-icon-button mat-dialog-close class="close-btn">
        <mat-icon>close</mat-icon>
      </button>

      @if (data.imageUrl) {
        <img [src]="data.imageUrl" [alt]="data.news.title" class="dialog-image" />
      }

      <div class="dialog-content">
        <h2 class="dialog-title">{{ data.news.title }}</h2>
        <p class="dialog-description">{{ data.news.description }}</p>
      </div>
    </div>
  `,
  styles: `
    .news-dialog {
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 2;
      background: rgba(255, 255, 255, 0.9) !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .dialog-image {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      display: block;
    }

    .dialog-content {
      padding: 28px 32px;
    }

    .dialog-title {
      margin: 0 0 16px;
      font-size: 1.8rem;
      color: var(--ts-text-dark);
    }

    .dialog-description {
      margin: 0;
      font-size: 1.1rem;
      color: #444;
      line-height: 1.7;
      white-space: pre-line;
    }

    @media (max-width: 600px) {
      .dialog-content {
        padding: 20px 24px;
      }

      .dialog-title {
        font-size: 1.3rem;
      }

      .dialog-description {
        font-size: 1rem;
      }

      .dialog-image {
        max-height: 300px;
      }
    }
  `,
})
export class NewsDetailDialog {
  constructor(@Inject(MAT_DIALOG_DATA) protected data: NewsDetailDialogData) {}
}
