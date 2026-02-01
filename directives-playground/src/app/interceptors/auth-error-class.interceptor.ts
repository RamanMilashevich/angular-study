import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

function getToken(): string | null {
  // Replace with real token source (localStorage, signal, auth service, etc.)
  return 'demo-token-123';
}

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = getToken();
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('HTTP error:', err.status, err.message);
        return throwError(() => err);
      })
    );
  }
}
