import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../bookmarks/services/auth.service';
import { inject } from '@angular/core';

export const weatherGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
