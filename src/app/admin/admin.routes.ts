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
        path: '',
        redirectTo: 'faq',
        pathMatch: 'full',
      },
    ],
  },
];
