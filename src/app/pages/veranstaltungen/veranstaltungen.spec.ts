import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Veranstaltungen } from './veranstaltungen';

describe('Veranstaltungen', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veranstaltungen],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Veranstaltungen);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Veranstaltungen);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Veranstaltungen');
  });
});
