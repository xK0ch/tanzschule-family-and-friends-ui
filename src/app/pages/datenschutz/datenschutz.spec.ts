import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Datenschutz } from './datenschutz';

describe('Datenschutz', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datenschutz],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Datenschutz);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Datenschutz);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Datenschutz');
  });
});
