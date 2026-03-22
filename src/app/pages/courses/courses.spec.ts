import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Courses } from './courses';

describe('Courses', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courses],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Courses);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Courses);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Kurse');
  });
});
