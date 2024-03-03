import { Component } from '@angular/core';
import { AppLogoComponent } from './app-logo.component';

@Component({
  selector: 'spartan-th-item-placeholder',
  standalone: true,
  imports: [AppLogoComponent],
  host: {
    class: 'inline-flex flex-col justify-center items-center',
  },
  template: `
    <app-logo
      class="bg-muted/40 h-9 w-9 -rotate-90 rounded-full p-1 [&>svg]:opacity-10 [&>svg]:grayscale dark:[&>svg]:opacity-50"
    />
    <div class="h-6"></div>
  `,
})
export class ThreeHundredItemPlaceholderComponent {}
