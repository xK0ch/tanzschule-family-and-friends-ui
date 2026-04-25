import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./admin-login/admin-login').then((m) => m.AdminLogin),
  },
  {
    path: '',
    loadComponent: () =>
      import('./admin-layout/admin-layout').then((m) => m.AdminLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'faq',
        loadComponent: () =>
          import('./admin-faq/admin-faq').then((m) => m.AdminFaq),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./admin-gallery/admin-gallery').then((m) => m.AdminGallery),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./admin-courses/admin-courses').then((m) => m.AdminCourses),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./admin-events/admin-events').then((m) => m.AdminEvents),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./admin-news/admin-news').then((m) => m.AdminNews),
      },
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full',
      },
    ],
  },
];
