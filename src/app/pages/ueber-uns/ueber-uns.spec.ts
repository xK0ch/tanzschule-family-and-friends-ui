import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { UeberUns } from './ueber-uns';

describe('UeberUns', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UeberUns],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UeberUns);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(UeberUns);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Über uns');
  });
});
