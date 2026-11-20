import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function philippineMobileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // required validator will handle empty
    }

    // Must start with 09 and have exactly 9 more digits (total 11 characters)
    const isValid = /^09\d{9}$/.test(value);

    return isValid ? null : { invalidMobile: true };
  };
}