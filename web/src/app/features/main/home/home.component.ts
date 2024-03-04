import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lucideStar } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmBadgeDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideStar })],
  host: {
    class: 'block p-4 pb-12 pt-6 sm:pb-24 sm:pt-12',
  },
  template: `
    <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div class="app-container max-w-[64rem]">
        <a
          target="_blank"
          href="https://github.com/0-don/spring-boot-ecommerce"
          hlmBadge
          class="!text-foreground-primary !hover:bg-primary/90 !bg-primary"
        >
          Explore the E-commerce Revolution. Welcome to Spartan Commerce.
        </a>
        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Secure and Scalable E-commerce Solutions.
        </h1>
        <p class="app-lead max-w-[42rem]">
          Elevate your online store with our Spring Boot e-commerce template,
          featuring secure Keycloak authentication and the sleek Spartan UI.
          Tailored for performance and scalability.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a hlmBtn size="lg" routerLink="/login">Get Started</a>
          <a
            hlmBtn
            size="lg"
            variant="outline"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/0-don/spring-boot-ecommerce"
          >
            Star on GitHub
            <hlm-icon class="ml-2 h-4 w-4" name="lucideStar" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {}
