import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FaqService, FaqResponse } from '../../../api/src';

@Component({
  selector: 'app-faq',
  imports: [MatCardModule, MatExpansionModule, MatIconModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq implements OnInit {
  protected faqs = signal<FaqResponse[]>([]);
  protected loading = signal(true);
  protected error = signal(false);

  private readonly faqService = inject(FaqService);

  ngOnInit(): void {
    this.faqService.getAll2().subscribe({
      next: (faqs) => {
        this.faqs.set(faqs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
