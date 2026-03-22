import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'neuigkeiten',
    pathMatch: 'full',
  },
  {
    path: 'neuigkeiten',
    loadComponent: () =>
      import('./pages/neuigkeiten/neuigkeiten').then((m) => m.Neuigkeiten),
  },
  {
    path: 'kurse',
    loadComponent: () =>
      import('./pages/kurse/kurse').then((m) => m.Kurse),
  },
  {
    path: 'veranstaltungen',
    loadComponent: () =>
      import('./pages/veranstaltungen/veranstaltungen').then(
        (m) => m.Veranstaltungen
      ),
  },
  {
    path: 'gutscheine',
    loadComponent: () =>
      import('./pages/gutscheine/gutscheine').then((m) => m.Gutscheine),
  },
  {
    path: 'galerie',
    loadComponent: () =>
      import('./pages/galerie/galerie').then((m) => m.Galerie),
  },
  {
    path: 'ueber-uns',
    loadComponent: () =>
      import('./pages/ueber-uns/ueber-uns').then((m) => m.UeberUns),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq').then((m) => m.Faq),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./pages/kontakt/kontakt').then((m) => m.Kontakt),
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/impressum/impressum').then((m) => m.Impressum),
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz').then((m) => m.Datenschutz),
  },
  {
    path: '**',
    redirectTo: 'neuigkeiten',
  },
];
