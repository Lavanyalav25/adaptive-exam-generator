import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar class="glass-morphism navbar">
      <span class="logo gradient-text" routerLink="/">SkillForge</span>
      <span class="spacer"></span>
      
      <div *ngIf="authService.user$ | async as user; else guest">
        <button mat-button routerLink="/student/dashboard" *ngIf="user.role === 'STUDENT'">Dashboard</button>
        <button mat-button routerLink="/instructor/dashboard" *ngIf="user.role === 'INSTRUCTOR'">Dashboard</button>
        <button mat-button [matMenuTriggerFor]="menu" class="profile-btn">
          <mat-icon>account_circle</mat-icon>
          {{ user.name }}
        </button>
        <mat-menu #menu="matMenu" class="glass-morphism">
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>

      <ng-template #guest>
        <button mat-button routerLink="/auth/login">Login</button>
        <button mat-flat-button class="premium-button" routerLink="/auth/register">Sign Up</button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [`
    .navbar { position: sticky; top: 0; z-index: 1000; padding: 0 2rem; background: var(--glass); border-bottom: 1px solid var(--glass-border); color: white !important; }
    .logo { font-size: 1.5rem; font-weight: 800; cursor: pointer; }
    .spacer { flex: 1 1 auto; }
    .profile-btn { display: flex; align-items: center; gap: 0.5rem; color: white !important; }
    button[mat-button] { color: white !important; }
    mat-icon { color: white !important; }
    ::ng-deep .mat-mdc-menu-panel { background: var(--bg-card) !important; border: 1px solid var(--glass-border) !important; color: white !important; }
  `]
})
export class NavbarComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
  }
}
