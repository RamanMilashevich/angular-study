import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthErrorInterceptor } from './interceptors/auth-error-class.interceptor';
import { authErrorInterceptor } from './interceptors/auth-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Functional interceptor registration (simple function-based style).
    provideHttpClient(withInterceptors([authErrorInterceptor]), withInterceptorsFromDi()),
    {
      // Class-based interceptor registration (DI style).
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true,
    },
  ]
};
