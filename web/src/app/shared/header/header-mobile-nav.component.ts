import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideMoreVertical, lucideX } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import {
  BrnSheetComponent,
  BrnSheetContentDirective,
  BrnSheetOverlayComponent,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetCloseDirective,
  HlmSheetContentComponent,
  HlmSheetOverlayDirective,
} from '@spartan-ng/ui-sheet-helm';
import { AppLogoComponent } from './app-logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@/app/shared/service/auth.service';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [
    BrnSheetComponent,
    BrnSheetOverlayComponent,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,

    HlmSheetCloseDirective,
    HlmSheetOverlayDirective,
    HlmSheetContentComponent,

    HlmButtonDirective,
    HlmIconComponent,

    HlmScrollAreaComponent,
    RouterLink,
    AppLogoComponent,
    TranslateModule,
    HlmSpinnerComponent,
  ],

  providers: [provideIcons({ lucideMoreVertical, lucideX })],
  template: `
    <brn-sheet side="left" closeDelay="100">
      <button
        size="sm"
        id="menu-trigger"
        variant="ghost"
        brnSheetTrigger
        class="text-green-[#fff]"
        hlmBtn
      >
        <hlm-icon name="lucideMoreVertical" size="sm" />
        <span class="sr-only">{{ 'header.navbar.openMenu' | translate }}</span>
      </button>
      <brn-sheet-overlay hlmSheetOverlay />
      <div hlmSheetContent class="pb-0 pr-0" *brnSheetContent="let ctx">
        <button brnSheetClose hlm>
          <span class="sr-only">{{ 'header.navbar.close' | translate }}</span>
          <hlm-icon class="flex h-4 w-4" name="lucideX" />
        </button>
        <div class="flex items-center pb-2">
          <a
            (click)="ctx.close()"
            hlmBtn
            variant="ghost"
            class="mr-4 p-1.5"
            routerLink="/"
          >
            <app-logo class="w-12 text-primary" />
          </a>
          <span>{{ 'header.navbar.app' | translate }}</span>
        </div>
        <hlm-scroll-area class="h-[calc(100vh-8rem)]">
          <div class="flex flex-col space-y-1 p-2 pb-4">
            @if (!auth.isAuthenticated()) {
              <a
                (click)="ctx.close()"
                class="px-2 py-1 text-foreground hover:underline"
                routerLink="/"
              >
                {{ 'header.navbar.home' | translate }}
              </a>
              <a
                (click)="ctx.close()"
                class="px-2 py-1 text-foreground hover:underline"
                routerLink="/register"
                >{{ 'header.navbar.register' | translate }}</a
              >
              <a
                (click)="ctx.close()"
                class="px-2 py-1 text-foreground hover:underline"
                routerLink="/login"
              >
                {{ 'header.navbar.login' | translate }}
              </a>
            }
            @if (auth.isAuthenticated()) {
              <a
                (click)="ctx.close()"
                class="px-2 py-1 text-foreground hover:underline"
                routerLink="/products"
              >
                {{ 'header.navbar.products' | translate }}
              </a>
            }
          </div>
        </hlm-scroll-area>
      </div>
    </brn-sheet>
  `,
})
export class HeaderMobileNavComponent {
  protected auth = inject(AuthService);
}
