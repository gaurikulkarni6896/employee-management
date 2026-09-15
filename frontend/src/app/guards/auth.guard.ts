import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // User is logged in
  if (authService.isLoggedIn()) {
    return true;
  }

  // User is NOT logged in
  alert('Please login first to access this page.');

  // Redirect to login
  return router.createUrlTree(['/login']);
};