import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@spartan-ng/ui-menu-helm';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../types/enums/language.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language',
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
    NgOptimizedImage,
  ],
  providers: [provideIcons({})],
  template: `
    <button
      size="sm"
      variant="ghost"
      align="end"
      [brnMenuTriggerFor]="language"
      hlmBtn
    >
      <img
        ngSrc="assets/flags/{{ lang }}.svg"
        alt="{{ lang }}"
        width="50"
        height="50"
      />
      <hlm-icon name="lucideMoon" size="sm" />
      <span class="sr-only">{{
        'header.language.changeLanguage' | translate
      }}</span>
    </button>
    <ng-template #language>
      <hlm-menu class="w-40">
        <button
          hlmMenuItemCheckbox
          [checked]="lang === 'EN'"
          (click)="setLang('EN')"
        >
          <hlm-menu-item-check />
          {{ 'header.language.EN' | translate }}
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="lang === 'DE'"
          (click)="setLang('DE')"
        >
          <hlm-menu-item-check />
          {{ 'header.language.DE' | translate }}
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class LanguageComponent {
  private translateService = inject(TranslateService);

  lang: keyof typeof LanguageEnum = LanguageEnum.EN;
  constructor() {
    this.toggleLanguageChanges();
  }
  private toggleLanguageChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(
        (language) => (this.lang = language.lang as keyof typeof LanguageEnum),
      );
  }
  setLang(lang: keyof typeof LanguageEnum) {
    this.translateService.use(lang);
  }
}
