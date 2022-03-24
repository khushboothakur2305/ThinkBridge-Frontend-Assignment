import { AbstractControl } from '@angular/forms';

export function passwordCheck(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control) {
    if (control.value.length < 8) {
      return { PasswordError: { value: 'Minimum length required is 8' } };
    }
    if (!control.value.match(/[A-Z]/)) {
      return { PasswordError: { value: 'Upper case required' } };
    }
    if (!control.value.match(/[a-z]/)) {
      return { PasswordError: { value: 'Lower case required' } };
    }
    if (control.value.match(/^[A-Za-z0-9 ]+$/)) {
      return { PasswordError: { value: 'Special Character required' } };
    }
    if (!control.value.match(/[0-9]/)) {
      return { PasswordError: { value: 'Number is required' } };
    } else {
      return null;
    }
  }
}
