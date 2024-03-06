import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
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
    HlmMenuComponent,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemCheckComponent,
    TranslateModule,
    NgOptimizedImage,
  ],
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
        width="25"
        height="12"
      />
      <span class="sr-only">{{
        'header.language.changeLanguage' | translate
      }}</span>
    </button>
    <ng-template #language>
      <hlm-menu class="w-40">
        <button
          hlmMenuItemCheckbox
          [checked]="lang === 'en'"
          (click)="setLang('en')"
        >
          <hlm-menu-item-check />
          {{ 'header.language.en' | translate }}
        </button>
        <button
          hlmMenuItemCheckbox
          [checked]="lang === 'de'"
          (click)="setLang('de')"
        >
          <hlm-menu-item-check />
          {{ 'header.language.de' | translate }}
        </button>
      </hlm-menu>
    </ng-template>
  `,
})
export class LanguageComponent {
  private _locale = 'locale';
  private translate = inject(TranslateService);
  lang: keyof typeof LanguageEnum = LanguageEnum.en;

  constructor() {
    this.initLanguage();
    this.toggleLanguageChanges();
  }

  initLanguage(): void {
    const locale = localStorage?.getItem(this._locale);
    if (locale) {
      this.lang = locale as keyof typeof LanguageEnum;
      this.translate.setDefaultLang(locale);
      this.translate.use(locale);
    } else {
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
      localStorage.setItem(this._locale, this.lang);
    }
  }

  private toggleLanguageChanges(): void {
    this.translate.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(({ lang }) => (this.lang = lang as keyof typeof LanguageEnum));
  }

  setLang(lang: keyof typeof LanguageEnum): void {
    this.translate.use(lang);
    localStorage.setItem(this._locale, lang);
  }
}
