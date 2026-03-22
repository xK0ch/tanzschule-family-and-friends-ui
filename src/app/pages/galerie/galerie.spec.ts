import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Galerie } from './galerie';

describe('Galerie', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galerie],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Galerie);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Galerie);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Galerie');
  });
});
