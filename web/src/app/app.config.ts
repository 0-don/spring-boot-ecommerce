import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  RouterModule,
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      RouterModule.forRoot(routes),
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule
    ),

    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideClientHydration(),
  ],
};
