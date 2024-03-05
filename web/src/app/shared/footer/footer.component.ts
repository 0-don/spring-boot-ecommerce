import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmMuted } from '@spartan-ng/ui-typography-helm';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HlmButtonDirective, TranslateModule],
  host: {
    class: 'block border-t bg-background/95 bg-blur-lg border-border px-4 py-8',
  },
  template: `
    <footer class="${hlmMuted} mx-auto max-w-screen-xl text-sm">
      {{ 'footer.builtBy' | translate }}
      <a
        class="h-6 px-0.5 text-sm"
        hlmBtn
        href="https://github.com/0-don"
        target="_blank"
        variant="link"
        >don.</a
      >
      {{ 'footer.openSource' | translate }}
      <a
        class="h-6 px-0.5 text-sm"
        hlmBtn
        href="https://github.com/0-don/spring-boot-ecommerce"
        target="_blank"
        variant="link"
      >
        {{ 'footer.github' | translate }}.
      </a>
    </footer>
  `,
})
export class FooterComponent {}
