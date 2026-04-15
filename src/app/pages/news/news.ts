import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { NewsResponse } from '../../core/models/news.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-news',
  imports: [MatIconModule, MatButtonModule],
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

  constructor(protected newsService: NewsService) {}

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

  protected prev(): void {
    this.stopAutoSlide();
    const list = this.newsList();
    if (list.length === 0) return;
    this.currentIndex.set(
      (this.currentIndex() - 1 + list.length) % list.length
    );
    this.startAutoSlide();
  }

  protected next(): void {
    this.stopAutoSlide();
    this.advanceSlide();
    this.startAutoSlide();
  }

  protected goTo(index: number): void {
    this.stopAutoSlide();
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => this.advanceSlide(), 5000);
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
