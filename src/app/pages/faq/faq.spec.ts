import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Faq } from './faq';

describe('Faq', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Faq);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Faq);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Häufig gestellte Fragen');
  });
});
