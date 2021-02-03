import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorsEnum } from '../../_enums/errors.enum';

export function passwordsMatchValidator(...controlsNames): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors => {
    for (let i = 0; i < controlsNames.length - 1; i++) {
      if (
        formGroup.get(controlsNames[i]).value !==
        formGroup.get(controlsNames[i + 1]).value
      ) {
        return { [ErrorsEnum.PasswordNotMatching]: true };
      }
    }
    return null;
  };
}
