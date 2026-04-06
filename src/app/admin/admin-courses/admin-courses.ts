import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseCategoryService } from '../../core/services/course-category.service';
import { CourseService } from '../../core/services/course.service';
import { CourseCategoryResponse, CourseResponse, CourseTariffRequest } from '../../core/models/course.model';

@Component({
  selector: 'app-admin-courses',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.scss',
})
export class AdminCourses implements OnInit {
  protected categories = signal<CourseCategoryResponse[]>([]);
  protected expandedCategoryId = signal<number | null>(null);
  protected editingCategoryId = signal<number | null>(null);
  protected showNewCategoryForm = signal(false);

  protected showNewCourseForCategoryId = signal<number | null>(null);
  protected editingCourseId = signal<number | null>(null);

  // Category form fields
  protected newCategoryName = '';
  protected editCategoryName = '';

  // Course form fields
  protected newCourseName = '';
  protected newCourseStartDate = '';
  protected newCourseStartTime = '';
  protected newCourseEndTime = '';
  protected newCourseNumberOfHours = '';
  protected newCourseTeacher = '';
  protected newCourseRemark = '';
  protected newCoursePartnerOption = false;
  protected newCourseTariffs: CourseTariffRequest[] = [];

  protected editCourseName = '';
  protected editCourseStartDate = '';
  protected editCourseStartTime = '';
  protected editCourseEndTime = '';
  protected editCourseNumberOfHours = '';
  protected editCourseTeacher = '';
  protected editCourseRemark = '';
  protected editCoursePartnerOption = false;
  protected editCourseCategoryId = 0;
  protected editCourseTariffs: CourseTariffRequest[] = [];

  constructor(
    private courseCategoryService: CourseCategoryService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // ── Categories ──

  protected loadCategories(): void {
    this.courseCategoryService.getAll().subscribe({
      next: (categories) => this.categories.set(categories),
      error: () => this.showMessage('Fehler beim Laden der Kategorien.'),
    });
  }

  protected toggleNewCategoryForm(): void {
    this.showNewCategoryForm.set(!this.showNewCategoryForm());
    this.newCategoryName = '';
  }

  protected createCategory(): void {
    if (!this.newCategoryName.trim()) return;
    const displayOrder = this.categories().length;
    this.courseCategoryService.create({ name: this.newCategoryName, displayOrder }).subscribe({
      next: () => {
        this.showMessage('Kategorie erstellt.');
        this.toggleNewCategoryForm();
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Erstellen.'),
    });
  }

  protected startEditCategory(category: CourseCategoryResponse): void {
    this.editingCategoryId.set(category.id);
    this.editCategoryName = category.name;
  }

  protected cancelEditCategory(): void {
    this.editingCategoryId.set(null);
  }

  protected saveCategory(category: CourseCategoryResponse): void {
    if (!this.editCategoryName.trim()) return;
    this.courseCategoryService.update(category.id, { name: this.editCategoryName, displayOrder: category.displayOrder }).subscribe({
      next: () => {
        this.showMessage('Kategorie aktualisiert.');
        this.editingCategoryId.set(null);
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Speichern.'),
    });
  }

  protected deleteCategory(category: CourseCategoryResponse): void {
    if (!confirm(`Kategorie "${category.name}" und alle zugehörigen Kurse wirklich löschen?`)) return;
    this.courseCategoryService.delete(category.id).subscribe({
      next: () => {
        this.showMessage('Kategorie gelöscht.');
        if (this.expandedCategoryId() === category.id) this.expandedCategoryId.set(null);
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected toggleExpand(categoryId: number): void {
    this.expandedCategoryId.set(this.expandedCategoryId() === categoryId ? null : categoryId);
  }

  protected moveCategoryUp(index: number): void {
    if (index <= 0) return;
    const ids = this.categories().map((c) => c.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    this.reorderCategories(ids);
  }

  protected moveCategoryDown(index: number): void {
    const ids = this.categories().map((c) => c.id);
    if (index >= ids.length - 1) return;
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    this.reorderCategories(ids);
  }

  private reorderCategories(ids: number[]): void {
    this.courseCategoryService.reorder(ids).subscribe({
      next: () => this.loadCategories(),
      error: () => this.showMessage('Fehler beim Sortieren.'),
    });
  }

  // ── Courses ──

  protected toggleNewCourseForm(categoryId: number): void {
    if (this.showNewCourseForCategoryId() === categoryId) {
      this.showNewCourseForCategoryId.set(null);
    } else {
      this.showNewCourseForCategoryId.set(categoryId);
      this.resetNewCourseForm();
    }
  }

  private resetNewCourseForm(): void {
    this.newCourseName = '';
    this.newCourseStartDate = '';
    this.newCourseStartTime = '';
    this.newCourseEndTime = '';
    this.newCourseNumberOfHours = '';
    this.newCourseTeacher = '';
    this.newCourseRemark = '';
    this.newCoursePartnerOption = false;
    this.newCourseTariffs = [{ name: 'Normal', price: 0 }];
  }

  protected createCourse(categoryId: number): void {
    if (!this.newCourseName.trim() || !this.newCourseStartDate || !this.newCourseStartTime || !this.newCourseEndTime || !this.newCourseNumberOfHours.trim() || !this.newCourseTeacher.trim()) return;
    this.courseService.create({
      name: this.newCourseName,
      startDate: this.newCourseStartDate,
      startTime: this.newCourseStartTime,
      endTime: this.newCourseEndTime,
      numberOfHours: this.newCourseNumberOfHours,
      teacher: this.newCourseTeacher,
      remark: this.newCourseRemark || null,
      partnerOption: this.newCoursePartnerOption,
      categoryId,
      tariffs: this.newCourseTariffs.filter((t) => t.name.trim() && t.price > 0),
    }).subscribe({
      next: () => {
        this.showMessage('Kurs erstellt.');
        this.showNewCourseForCategoryId.set(null);
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Erstellen.'),
    });
  }

  protected startEditCourse(course: CourseResponse): void {
    this.editingCourseId.set(course.id);
    this.editCourseName = course.name;
    this.editCourseStartDate = course.startDate;
    this.editCourseStartTime = course.startTime.substring(0, 5);
    this.editCourseEndTime = course.endTime.substring(0, 5);
    this.editCourseNumberOfHours = course.numberOfHours;
    this.editCourseTeacher = course.teacher;
    this.editCourseRemark = course.remark || '';
    this.editCoursePartnerOption = course.partnerOption;
    this.editCourseCategoryId = course.categoryId;
    this.editCourseTariffs = course.tariffs.map((t) => ({ name: t.name, price: t.price }));
    if (this.editCourseTariffs.length === 0) {
      this.editCourseTariffs = [{ name: 'Normal', price: 0 }];
    }
  }

  protected cancelEditCourse(): void {
    this.editingCourseId.set(null);
  }

  protected saveCourse(course: CourseResponse): void {
    if (!this.editCourseName.trim() || !this.editCourseStartDate || !this.editCourseStartTime || !this.editCourseEndTime || !this.editCourseNumberOfHours.trim() || !this.editCourseTeacher.trim()) return;
    this.courseService.update(course.id, {
      name: this.editCourseName,
      startDate: this.editCourseStartDate,
      startTime: this.editCourseStartTime,
      endTime: this.editCourseEndTime,
      numberOfHours: this.editCourseNumberOfHours,
      teacher: this.editCourseTeacher,
      remark: this.editCourseRemark || null,
      partnerOption: this.editCoursePartnerOption,
      categoryId: this.editCourseCategoryId,
      tariffs: this.editCourseTariffs.filter((t) => t.name.trim() && t.price > 0),
    }).subscribe({
      next: () => {
        this.showMessage('Kurs aktualisiert.');
        this.editingCourseId.set(null);
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Speichern.'),
    });
  }

  protected deleteCourse(course: CourseResponse): void {
    if (!confirm(`Kurs "${course.name}" wirklich löschen?`)) return;
    this.courseService.delete(course.id).subscribe({
      next: () => {
        this.showMessage('Kurs gelöscht.');
        this.loadCategories();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  // ── Tariffs ──

  protected addNewTariff(): void {
    this.newCourseTariffs.push({ name: '', price: 0 });
  }

  protected removeNewTariff(index: number): void {
    this.newCourseTariffs.splice(index, 1);
  }

  protected addEditTariff(): void {
    this.editCourseTariffs.push({ name: '', price: 0 });
  }

  protected removeEditTariff(index: number): void {
    this.editCourseTariffs.splice(index, 1);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
