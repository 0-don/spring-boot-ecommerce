import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@spartan-ng/ui-menu-helm';
import { TranslateModule } from '@ngx-translate/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleUser } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmMenuComponent,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemCheckComponent,
    TranslateModule,
    RouterLink,
    AsyncPipe,
  ],
  providers: [provideIcons({ lucideCircleUser })],
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [brnMenuTriggerFor]="language"
      hlmBtn
    >
      <hlm-icon name="lucideCircleUser" size="sm" />
      <span class="sr-only">{{
        'header.profile.description' | translate
      }}</span>
    </button>
    <ng-template #language>
      <hlm-menu class="w-40">
        <a routerLink="/register" class="!cursor-pointer">
          <button hlmMenuItemCheckbox>
            {{ 'header.navbar.register' | translate }}
          </button>
        </a>
        <a routerLink="/login" class="!cursor-pointer">
          <button hlmMenuItemCheckbox>
            {{ 'header.navbar.login' | translate }}
          </button>
        </a>
      </hlm-menu>
    </ng-template>
  `,
})
export class ProfileComponent {}
