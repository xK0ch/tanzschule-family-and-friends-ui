import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Neuigkeiten } from './neuigkeiten';

describe('Neuigkeiten', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Neuigkeiten],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Neuigkeiten);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Neuigkeiten);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Neuigkeiten');
  });
});
