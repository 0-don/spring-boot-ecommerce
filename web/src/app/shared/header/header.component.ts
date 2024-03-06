import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideTwitter } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { AppLogoComponent } from './app-logo.component';
import { ThemeComponent } from './theme.component';
import { HeaderMobileNavComponent } from './header-mobile-nav.component';
import { AppNavLinkDirective } from './app-nav-link.directive';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from './language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HlmIconComponent,
    AppNavLinkDirective,
    HlmButtonDirective,

    RouterLink,
    TranslateModule,

    HeaderMobileNavComponent,
    ThemeComponent,
    LanguageComponent,
    AppLogoComponent,
  ],
  providers: [provideIcons({ lucideTwitter, lucideGithub })],
  host: {
    class:
      'block sticky w-full top-0 z-40 bg-background/95 bg-blur-lg p-2 sm:px-4 border-b border-border',
  },
  template: `
    <div
      class="mx-auto flex w-full max-w-screen-xl items-center justify-between"
    >
      <nav class="flex items-center">
        <a
          hlmBtn
          variant="ghost"
          class="mr-3 hidden p-1.5 sm:flex"
          routerLink="/"
        >
          <app-logo class="w-14" />
          <span class="sr-only">{{ 'header.navbar.app' | translate }}</span>
        </a>

        <app-mobile-nav class="sm:hidden" />

        <div class="hidden sm:flex sm:space-x-2">
          <a appNavLink="/home">{{ 'header.navbar.home' | translate }}</a>
        </div>
      </nav>

      <div class="flex space-x-2">
        <a
          href="https://github.com/0-don/spring-boot-ecommerce"
          target="_blank"
          size="sm"
          variant="ghost"
          hlmBtn
        >
          <span class="sr-only">{{ 'header.navbar.github' | translate }}</span>
          <hlm-icon name="lucideGithub" size="sm" />
        </a>
        <app-theme />
        <app-language />
      </div>
    </div>
  `,
})
export class HeaderComponent {}
