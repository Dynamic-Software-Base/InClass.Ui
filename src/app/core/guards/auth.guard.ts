import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SessionInitializerService } from '../auth/session-initializer.service';
import { AuthStore } from '../auth/auth.store';

export const authGuard: CanActivateFn = async (_route, state): Promise<boolean | UrlTree> => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const sessionInitializer = inject(SessionInitializerService);

  await sessionInitializer.ensureInitialized();

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
