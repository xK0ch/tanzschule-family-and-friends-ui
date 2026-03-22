import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { News } from './news';

describe('News', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [News],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(News);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(News);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Neuigkeiten');
  });
});
