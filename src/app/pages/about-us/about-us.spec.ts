import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { AboutUs } from './about-us';

describe('AboutUs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUs],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutUs);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(AboutUs);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Über uns');
  });
});
