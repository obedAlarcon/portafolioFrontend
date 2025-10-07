import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth-login.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthLoginService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
 
};
