import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have main navigation items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['mainNavItems'].length).toBe(8);
  });

  it('should have footer navigation items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['footerNavItems'].length).toBe(2);
  });

  it('should contain Neuigkeiten in nav items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const labels = app['mainNavItems'].map((item: { label: string }) => item.label);
    expect(labels).toContain('Neuigkeiten');
  });

  it('should contain Impressum in footer nav items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const labels = app['footerNavItems'].map((item: { label: string }) => item.label);
    expect(labels).toContain('Impressum');
  });

  it('should contain Datenschutz in footer nav items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const labels = app['footerNavItems'].map((item: { label: string }) => item.label);
    expect(labels).toContain('Datenschutz');
  });

  it('should render the toolbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should render the sidenav container', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-sidenav-container')).toBeTruthy();
  });
});
