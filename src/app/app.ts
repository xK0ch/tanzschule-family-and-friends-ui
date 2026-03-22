import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  protected readonly isMobile = signal(false);

  protected readonly mainNavItems: NavItem[] = [
    { label: 'Neuigkeiten', route: '/news', icon: 'newspaper' },
    { label: 'Kurse', route: '/courses', icon: 'school' },
    { label: 'Veranstaltungen', route: '/events', icon: 'event' },
    { label: 'Gutscheine', route: '/vouchers', icon: 'card_giftcard' },
    { label: 'Galerie', route: '/gallery', icon: 'photo_library' },
    { label: 'Über uns', route: '/about-us', icon: 'group' },
    { label: 'FAQ', route: '/faq', icon: 'help_outline' },
    { label: 'Kontakt', route: '/contact', icon: 'mail' },
  ];

  protected readonly footerNavItems: NavItem[] = [
    { label: 'Impressum', route: '/legal-notice', icon: 'gavel' },
    { label: 'Datenschutz', route: '/privacy-policy', icon: 'privacy_tip' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  protected onNavClick(): void {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }
}
