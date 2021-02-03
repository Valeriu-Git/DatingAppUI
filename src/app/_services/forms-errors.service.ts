import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ErrorsEnum } from '../_enums/errors.enum';

@Injectable({
  providedIn: 'root',
})
export class FormsErrorsService {
  constructor() {}

  public getErrorMessage(formGroup: FormGroup): string {
    for (const controlKey in formGroup.controls) {
      const control: AbstractControl = formGroup.controls[controlKey];
      for (const errorKey in control.errors) {
        switch (errorKey) {
          case ErrorsEnum.InvalidFormat:
            return `The ${controlKey} must have at least 10 characters, an uppercase character and a special character!`;
          case ErrorsEnum.Required:
            const controlName = controlKey;
            return `The ${controlName} is required!`;
          case ErrorsEnum.PasswordNotMatching:
            return 'Passwords do not match!';
          case ErrorsEnum.MinimumLength:
            return `The minimum length for the ${controlKey} field is ${control.errors[errorKey].requiredLength} characters!`;
        }
      }
    }
    return null;
  }
}
