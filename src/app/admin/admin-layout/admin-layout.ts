import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  protected isMobile = signal(false);
  protected sidenavOpen = signal(false);

  constructor(
    protected authService: AuthService,
    private router: Router,
    breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe('(max-width: 768px)').subscribe((result) => {
      this.isMobile.set(result.matches);
      if (!result.matches) {
        this.sidenavOpen.set(false);
      }
    });
  }

  protected toggleSidenav(): void {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  protected onNavClick(): void {
    if (this.isMobile()) {
      this.sidenavOpen.set(false);
    }
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
