import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Vouchers } from './vouchers';

describe('Vouchers', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vouchers],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Vouchers);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const fixture = TestBed.createComponent(Vouchers);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gutscheine');
  });
});
