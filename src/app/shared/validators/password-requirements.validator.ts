import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorsEnum } from '../../_enums/errors.enum';

export function passwordValidator(
  passwordFormControl: AbstractControl
): { [key: string]: boolean } | null {
  const value: string = passwordFormControl.value;
  if (value === '' || !checkUpperCase(value) || !checkSpecialCharacter(value)) {
    return { [ErrorsEnum.InvalidFormat]: true };
  }
  return null;
}

function checkUpperCase(str: string): boolean {
  const characters = [...str];
  for (const character of characters) {
    if (character === character.toUpperCase()) {
      return true;
    }
  }
  return false;
}

function checkSpecialCharacter(str: string): boolean {
  const specialCharacters = ['$', '#', '@', '!', '%', '^', '&', '*', ''];
  const characters = [...str];
  for (const character of characters) {
    if (specialCharacters.findIndex((el) => el === character) !== -1) {
      return true;
    }
  }
  return false;
}
