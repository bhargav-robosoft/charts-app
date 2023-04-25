import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPin implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const { pin, confirmPin } = control.value;

    if (pin === confirmPin) {
      return null;
    } else {
      return { pinsDontMatch: true };
    }
  }
}
