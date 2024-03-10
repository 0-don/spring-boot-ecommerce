import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateLoaderService {
  private _translate = inject(TranslateService);

  public loadTranslations(func: (...args: any[]) => any | Promise<any>) {
    if (this._translate.store.translations[this._translate.currentLang]) {
      func();
    } else {
      this._translate.onDefaultLangChange
        .pipe(take(1))
        .subscribe((_) => func());
    }
  }
}
