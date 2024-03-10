import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@spartan-ng/ui-menu-helm';
import { DarkMode, ThemeService } from '../service/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    AsyncPipe,
    HlmMenuComponent,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemCheckComponent,
    TranslateModule,
    RouterLink,
  ],
  providers: [provideIcons({ lucideMoon })],
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [brnMenuTriggerFor]="theme"
      hlmBtn
    >
      <hlm-icon name="lucideMoon" size="sm" />
      <span class="sr-only">{{ 'header.theme.changeTheme' | translate }}</span>
    </button>
    <ng-template #theme>
      <hlm-menu class="w-40">
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'light'"
          (click)="setTheme('light')"
        >
          <hlm-menu-item-check />
          {{ 'header.theme.light' | translate }}
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'dark'"
          (click)="setTheme('dark')"
        >
          <hlm-menu-item-check />
          {{ 'header.theme.dark' | translate }}
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="(theme$ | async) === 'system'"
          (click)="setTheme('system')"
        >
          <hlm-menu-item-check />
          {{ 'header.theme.system' | translate }}
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class ThemeComponent {
  private _themeService = inject(ThemeService);
  theme$ = this._themeService.darkMode$;

  public setTheme(theme: DarkMode) {
    this._themeService.setDarkMode(theme);
  }
}
