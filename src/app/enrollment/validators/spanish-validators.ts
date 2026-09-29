import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

/** Valida un DNI o NIE español, incluida la letra de control. */
export const dniNieValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value ?? '')
    .toUpperCase()
    .replace(/[\s-]/g, '');
  if (!value) {
    return null; // "required" se encarga del vacío
  }
  const match = /^([XYZ]?)(\d{7,8})([A-Z])$/.exec(value);
  if (!match) {
    return { dniNie: true };
  }
  const [, niePrefix, digits, letter] = match;
  // En el NIE, la X/Y/Z inicial se sustituye por 0/1/2 para calcular la letra.
  const numeric = Number(niePrefix ? `${'XYZ'.indexOf(niePrefix)}${digits}` : digits);
  return DNI_LETTERS[numeric % 23] === letter ? null : { dniNie: true };
};

/** Móvil español: 9 dígitos que empiezan por 6 o 7 (admite espacios y +34). */
export const spanishMobileValidator: ValidatorFn = (control) => {
  const value = String(control.value ?? '').replace(/\s/g, '');
  if (!value) {
    return null;
  }
  return /^(\+34)?[67]\d{8}$/.test(value) ? null : { mobile: true };
};

/** Código postal español: 5 dígitos, provincia 01–52. */
export const postalCodeValidator: ValidatorFn = (control) => {
  const value = String(control.value ?? '').trim();
  if (!value) {
    return null;
  }
  return /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(value) ? null : { postalCode: true };
};
