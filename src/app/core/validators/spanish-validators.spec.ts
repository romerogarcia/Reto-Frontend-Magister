import { FormControl } from '@angular/forms';

import { dniNieValidator, postalCodeValidator, spanishMobileValidator } from './spanish-validators';

const check = (validator: typeof dniNieValidator, value: string) =>
  validator(new FormControl(value));

describe('Validadores españoles', () => {
  it('acepta DNI y NIE con letra correcta', () => {
    expect(check(dniNieValidator, '12345678Z')).toBeNull();
    expect(check(dniNieValidator, 'x1234567l')).toBeNull();
    expect(check(dniNieValidator, '')).toBeNull();
  });

  it('rechaza DNI con letra incorrecta o formato inválido', () => {
    expect(check(dniNieValidator, '12345678A')).toEqual({ dniNie: true });
    expect(check(dniNieValidator, 'ABC')).toEqual({ dniNie: true });
  });

  it('valida móviles españoles', () => {
    expect(check(spanishMobileValidator, '605 45 32 97')).toBeNull();
    expect(check(spanishMobileValidator, '+34 712345678')).toBeNull();
    expect(check(spanishMobileValidator, '505453297')).toEqual({ mobile: true });
  });

  it('valida códigos postales', () => {
    expect(check(postalCodeValidator, '28405')).toBeNull();
    expect(check(postalCodeValidator, '99999')).toEqual({ postalCode: true });
    expect(check(postalCodeValidator, '2840')).toEqual({ postalCode: true });
  });
});
