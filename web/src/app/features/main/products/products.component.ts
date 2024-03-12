import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lucideLogIn, lucideMoonStar, lucideStar } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { TranslateModule } from '@ngx-translate/core';
import { EntityModelProduct, ProductEntityControllerService } from '@/openapi';
import {
  BrnCommandComponent,
  BrnCommandEmptyDirective,
  BrnCommandImports,
  BrnCommandItemDirective,
} from '@spartan-ng/ui-command-brain';
import {
  HlmCommandEmptyDirective,
  HlmCommandGroupDirective,
  HlmCommandImports,
  HlmCommandItemDirective,
  HlmCommandItemIconDirective,
  HlmCommandListDirective,
} from '@spartan-ng/ui-command-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { NgOptimizedImage } from '@angular/common';

type Framework = { label: string; value: string };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmBadgeDirective,
    HlmIconComponent,
    TranslateModule,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    BrnCommandComponent,
    BrnCommandEmptyDirective,
    HlmCommandEmptyDirective,
    HlmCommandListDirective,
    HlmCommandGroupDirective,
    HlmCommandItemDirective,
    HlmCommandItemIconDirective,
    BrnCommandItemDirective,
    NgOptimizedImage,
  ],
  providers: [provideIcons({ lucideStar, lucideLogIn, lucideMoonStar })],
  host: {
    class: 'block p-4 pb-12 pt-6 sm:pb-24 sm:pt-12',
  },
  template: `
    <main class="container mx-auto grid grid-cols-4 gap-5">
      @for (product of products(); track product.name) {
        <section class="w-80" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>{{ product.name }}</h3>
            <p hlmCardDescription class="truncate">{{ product.description }}</p>
          </div>
          <p hlmCardContent class="relative h-32">
            <img
              ngSrc="{{ product.imageUrl }}"
              alt="{{ product.name }}"
              fill
              class="bg-cover"
            />
          </p>
          <div hlmCardFooter class="justify-between"></div>
        </section>
      }
    </main>
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
      this.products.set(products._embedded?.product || []);
      console.log(products._embedded?.product);
    });
  }
}
