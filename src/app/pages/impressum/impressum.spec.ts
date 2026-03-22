import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Impressum } from './impressum';

describe('Impressum', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Impressum],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Impressum);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Impressum);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Impressum');
  });
});
