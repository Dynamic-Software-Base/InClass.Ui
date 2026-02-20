import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SessionInitializerService } from '../auth/session-initializer.service';
import { AuthStore } from '../auth/auth.store';

const PROTECTED_ROUTE_DELAY_MS = 1000;

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const authGuard: CanActivateFn = async (_route, state): Promise<boolean | UrlTree> => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const sessionInitializer = inject(SessionInitializerService);

  await sessionInitializer.ensureInitialized();
  await wait(PROTECTED_ROUTE_DELAY_MS);

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
