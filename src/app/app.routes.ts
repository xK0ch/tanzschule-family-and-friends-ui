import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'news',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses').then((m) => m.Courses),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/course-detail/course-detail').then(
        (m) => m.CourseDetail
      ),
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
    path: 'gallery/:id',
    loadComponent: () =>
      import('./pages/gallery-detail/gallery-detail').then(
        (m) => m.GalleryDetail
      ),
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
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
