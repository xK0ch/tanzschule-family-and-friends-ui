import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { CourseCategoryService } from '../../core/services/course-category.service';
import { CourseCategoryResponse } from '../../core/models/course.model';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, DatePipe, DecimalPipe, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  protected allCategories = signal<CourseCategoryResponse[]>([]);
  protected selectedCategoryIds = signal<Set<string>>(new Set());
  protected loading = signal(true);

  protected filteredCategories = computed(() => {
    const selected = this.selectedCategoryIds();
    const all = this.allCategories();
    if (selected.size === 0) {
      return all.filter((c) => c.courses.length > 0);
    }
    return all.filter((c) => selected.has(c.id) && c.courses.length > 0);
  });

  constructor(private courseCategoryService: CourseCategoryService) {
    this.courseCategoryService.getAll().subscribe({
      next: (categories) => {
        this.allCategories.set(categories);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected selectedCategoryArray = computed(() => [...this.selectedCategoryIds()]);

  protected onFilterChange(event: MatChipListboxChange): void {
    this.selectedCategoryIds.set(new Set(event.value));
  }

  protected clearFilter(): void {
    this.selectedCategoryIds.set(new Set());
  }
}
