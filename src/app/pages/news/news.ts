import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { NewsResponse } from '../../core/models/news.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewsDetailDialog } from './news-detail-dialog';

@Component({
  selector: 'app-news',
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit, OnDestroy {
  protected newsList = signal<NewsResponse[]>([]);
  protected currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  protected currentNews = computed(() => {
    const list = this.newsList();
    if (list.length === 0) return null;
    return list[this.currentIndex()];
  });

  constructor(
    protected newsService: NewsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newsService.getAll().subscribe({
      next: (news) => {
        this.newsList.set(news);
        if (news.length > 1) {
          this.startAutoSlide();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  protected openDetail(news: NewsResponse): void {
    this.stopAutoSlide();
    const dialogRef = this.dialog.open(NewsDetailDialog, {
      data: {
        news,
        imageUrl: news.image
          ? this.newsService.getImageUrl(news.id)
          : null,
      },
      maxWidth: '900px',
      width: '90vw',
      panelClass: 'news-detail-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.newsList().length > 1) {
        this.startAutoSlide();
      }
    });
  }

  protected prev(event: Event): void {
    event.stopPropagation();
    this.stopAutoSlide();
    const list = this.newsList();
    if (list.length === 0) return;
    this.currentIndex.set(
      (this.currentIndex() - 1 + list.length) % list.length
    );
    this.startAutoSlide();
  }

  protected next(event: Event): void {
    event.stopPropagation();
    this.stopAutoSlide();
    this.advanceSlide();
    this.startAutoSlide();
  }

  protected goTo(index: number, event: Event): void {
    event.stopPropagation();
    this.stopAutoSlide();
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => this.advanceSlide(), 8000);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private advanceSlide(): void {
    const list = this.newsList();
    if (list.length === 0) return;
    this.currentIndex.set((this.currentIndex() + 1) % list.length);
  }
}
