import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

function getToken(): string | null {
  // Replace with real token source (localStorage, signal, auth service, etc.)
  return 'demo-token-123';
}

// Functional interceptor example (the "old" lightweight way).
export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken();
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      // Centralized error handling
      console.error('HTTP error:', err.status, err.message);
      return throwError(() => err);
    })
  );
};
