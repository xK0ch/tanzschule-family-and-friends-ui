import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Kurse } from './kurse';

describe('Kurse', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kurse],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Kurse);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Kurse);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Kurse');
  });
});
