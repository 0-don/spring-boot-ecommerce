import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lucideLogIn, lucideMoonStar, lucideStar } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { TranslateModule } from '@ngx-translate/core';
import { EntityModelProduct, ProductEntityControllerService } from '@/openapi';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmBadgeDirective,
    HlmIconComponent,
    TranslateModule,
  ],
  providers: [provideIcons({ lucideStar, lucideLogIn, lucideMoonStar })],
  host: {
    class: 'block p-4 pb-12 pt-6 sm:pb-24 sm:pt-12',
  },
  template: `
    <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"></section>
  `,
})
export class ProductsComponent {
  protected products = signal<Array<EntityModelProduct>>([]);
  private _products = inject(ProductEntityControllerService);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    this._products.getCollectionResourceProductGet1().subscribe((products) => {
      if (products._embedded?.product) {
        this.products.set(products._embedded.product);
        console.log(products._embedded.product);
      }
    });
  }
}
