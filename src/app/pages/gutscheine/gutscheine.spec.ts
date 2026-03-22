import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Gutscheine } from './gutscheine';

describe('Gutscheine', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gutscheine],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Gutscheine);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Gutscheine);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gutscheine');
  });
});
