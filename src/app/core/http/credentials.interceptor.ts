import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlingService } from '../errors/error-handling.service';

const shouldSetJsonContentType = (body: unknown): boolean => {
  if (body === null || body === undefined) {
    return false;
  }

  return !(body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer);
};

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorHandlingService = inject(ErrorHandlingService);

  const method = req.method.toUpperCase();
  const isWriteMethod = method === 'POST' || method === 'PUT' || method === 'PATCH';
  const hasContentType = req.headers.has('Content-Type');

  const clonedReq = req.clone({
    withCredentials: true,
    setHeaders:
      isWriteMethod && shouldSetJsonContentType(req.body) && !hasContentType
        ? { 'Content-Type': 'application/json' }
        : {}
  });

  return next(clonedReq).pipe(
    catchError((error: unknown) => {
      errorHandlingService.capture(error);

      if (error instanceof HttpErrorResponse && error.status === 401) {
        const isAuthMeCall = clonedReq.url.includes('/auth/me');
        const isOnLoginRoute = router.url.startsWith('/auth/login');

        if (!isAuthMeCall && !isOnLoginRoute) {
          void router.navigate(['/auth/login'], {
            queryParams: { returnUrl: router.url }
          });
        }
      }

      return throwError(() => error);
    })
  );
};
