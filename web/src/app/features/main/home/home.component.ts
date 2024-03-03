import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HlmButtonDirective],
  template: `<button hlmBtn variant="secondary">Button</button>`,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'anuglar-ecommerce';
}
         