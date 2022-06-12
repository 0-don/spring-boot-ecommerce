import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CheckoutValidators {
  static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length > 0) {
      return null;
    }
    return { notOnlyWhitespace: true };
  }
}
