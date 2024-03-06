import {
  computed,
  Directive,
  effect,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { SignalInputDirective } from 'ng-signal-forms';

export const inputErrorVariants = cva('text-destructive text-sm font-medium', {
  variants: {},
  defaultVariants: {},
});
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Directive({
  selector: '[hlmInputError],[ngModel][formField]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmInputErrorDirective implements OnInit {
  public readonly _userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(inputErrorVariants(), this._userClass()),
  );

  private _injector = inject(Injector);
  private _label = inject(HlmLabelDirective, {
    skipSelf: true,
    optional: true,
  });
  private readonly _signalInput = inject(SignalInputDirective, {
    optional: true,
  });
  ngOnInit() {
    effect(
      () => {
        if (
          this._signalInput?.formField?.touchedState() === 'TOUCHED' &&
          Object.values(this._signalInput?.formField?.errors() ?? {}).length > 0
        ) {
          if (this._label) this._label.error = true;
        } else {
          if (this._label) this._label.error = 'auto';
        }
      },
      {
        injector: this._injector,
        allowSignalWrites: true,
      },
    );
  }
}
