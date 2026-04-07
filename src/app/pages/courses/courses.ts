import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseCategoryService } from '../../core/services/course-category.service';
import { CourseCategoryResponse } from '../../core/models/course.model';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, DatePipe, DecimalPipe, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  protected categories = signal<CourseCategoryResponse[]>([]);
  protected loading = signal(true);

  constructor(private courseCategoryService: CourseCategoryService) {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.courseCategoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories.filter((c) => c.courses.length > 0));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
