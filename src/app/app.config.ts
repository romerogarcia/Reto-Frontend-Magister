import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { UrlSerializer, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LowerCaseUrlSerializer } from './core/lower-case-url-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
  ],
};
