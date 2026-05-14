import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userRole = authService.getUserRole();
    const expectedRoles = route.data['roles'] as Array<string>;

    if (expectedRoles && !expectedRoles.includes(userRole)) {
      if (userRole === 'STUDENT') router.navigate(['/student/dashboard']);
      if (userRole === 'INSTRUCTOR') router.navigate(['/instructor/dashboard']);
      if (userRole === 'ADMIN') router.navigate(['/admin/dashboard']);
      return false;
    }
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
