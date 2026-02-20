import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

export const roleGuard: CanActivateFn = (route): boolean | UrlTree => {
  const expectedRoles = (route.data?.['roles'] as string[] | undefined) ?? [];
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!expectedRoles.length) {
    return true;
  }

  const userRoles = authStore.user()?.roles ?? [];
  const hasRole = expectedRoles.some((role) => userRoles.includes(role));
  return hasRole ? true : router.createUrlTree(['/app/dashboard']);
};