import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Kontakt } from './kontakt';

describe('Kontakt', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kontakt],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Kontakt);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Kontakt);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Kontakt');
  });
});
