import { NgModule } from '@angular/core';
import { HlmInputErrorDirective } from './lib/hlm-input-error.directive';
import { HlmInputDirective } from './lib/hlm-input.directive';
import { HlmInputErrorComponent } from './lib/hlm-input-error.component';
import { HlmInputFormErrorDirective } from './lib/hlm-input-form-error.directive';

export * from './lib/hlm-input-error.directive';
export * from './lib/hlm-input.directive';
export * from './lib/hlm-input-error.component';
export * from './lib/hlm-input-form-error.directive';

@NgModule({
  imports: [
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmInputErrorComponent,
    HlmInputFormErrorDirective,
  ],
  exports: [
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmInputErrorComponent,
    HlmInputFormErrorDirective,
  ],
})
export class HlmInputModule {}
