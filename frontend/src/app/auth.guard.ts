import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (
  route, 
  state) => {
     const auth = inject(AuthService);
     return auth.loggedIn();
};
