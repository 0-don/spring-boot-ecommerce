import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <div class="mx-auto max-w-screen-2xl">
      <router-outlet />
    </div>
    <app-footer />
  `,
})
export class AppComponent {
  // private _auth = inject(AuthService);
}
