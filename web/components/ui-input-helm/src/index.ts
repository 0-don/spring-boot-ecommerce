import { NgModule } from '@angular/core';
import { HlmInputErrorDirective } from './lib/hlm-input-error.directive';
import { HlmInputDirective } from './lib/hlm-input.directive';
import { HlmInputErrorComponent } from './lib/hlm-input-error.component';

export * from './lib/hlm-input-error.directive';
export * from './lib/hlm-input.directive';
export * from './lib/hlm-input-error.component';

@NgModule({
  imports: [HlmInputDirective, HlmInputErrorDirective, HlmInputErrorComponent],
  exports: [HlmInputDirective, HlmInputErrorDirective, HlmInputErrorComponent],
})
export class HlmInputModule {}
