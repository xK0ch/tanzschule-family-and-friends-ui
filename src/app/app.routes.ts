import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/news').then((m) => m.News),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses').then((m) => m.Courses),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events').then((m) => m.Events),
  },
  {
    path: 'vouchers',
    loadComponent: () =>
      import('./pages/vouchers/vouchers').then((m) => m.Vouchers),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq').then((m) => m.Faq),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then((m) => m.LegalNotice),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then(
        (m) => m.PrivacyPolicy
      ),
  },
  {
    path: '**',
    redirectTo: 'news',
  },
];
