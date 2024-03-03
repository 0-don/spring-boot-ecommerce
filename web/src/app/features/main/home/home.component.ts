import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmBadgeDirective,
    HlmIconComponent,
  ],
  host: {
    class: 'block p-4 pb-12 pt-6 sm:pb-24 sm:pt-12',
  },
  template: `
    <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div class="app-container max-w-[64rem]">
        <a
          target="_blank"
          href="https://github.com/goetzrobin/spartan"
          hlmBadge
          class="!bg-primary !text-foreground-primary !hover:bg-primary/90"
        >
          This is madness. This is spartan.
        </a>
        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Cutting-edge tools powering Angular full-stack development.
        </h1>
        <p class="app-lead max-w-[42rem]">
          Build next-level, full-stack applications with AnalogJs and the
          spartan/stack. Make them accessible and look incredible with
          spartan/ui.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a hlmBtn size="lg" routerLink="/documentation">Login</a>
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
