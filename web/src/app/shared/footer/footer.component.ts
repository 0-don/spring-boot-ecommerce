import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmMuted } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HlmButtonDirective],
  host: {
    class: 'block border-t bg-background/95 bg-blur-lg border-border px-4 py-8',
  },
  template: `
    <footer class="${hlmMuted} mx-auto max-w-screen-xl text-sm">
      Built by
      <a
        class="h-6 px-0.5 text-sm"
        hlmBtn
        href="https://github.com/0-don"
        target="_blank"
        variant="link"
        >mihajm.</a
      >
      Open source and available on
      <a
        class="h-6 px-0.5 text-sm"
        hlmBtn
        href="https://github.com/0-don/spring-boot-ecommerce"
        target="_blank"
        variant="link"
      >
        GitHub.
      </a>
    </footer>
  `,
})
export class FooterComponent {}
