import { Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { of, startWith, switchMap } from 'rxjs';

export type ErrorMessages = Readonly<Record<string, string>>;

export const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  required: 'Campo obligatorio',
  minlength: 'Demasiado corto',
  email: 'Email no válido',
  dniNie: 'DNI/NIE no válido',
  mobile: 'Móvil no válido',
  postalCode: 'Código postal no válido',
};

/**
 * Signal con el mensaje del primer error de un control, o null.
 * Solo muestra errores de controles "touched" (tras interactuar o intentar avanzar).
 * Debe llamarse en un contexto de inyección (p. ej. al inicializar un campo).
 */
export function errorMessageOf(
  control: Signal<AbstractControl | null | undefined>,
  overrides: Signal<ErrorMessages> = computed(() => ({})),
): Signal<string | null> {
  // Reacciona a cualquier cambio de valor, estado o "touched" del control.
  const changes = toSignal(
    toObservable(control).pipe(switchMap((c) => (c ? c.events.pipe(startWith(null)) : of(null)))),
  );

  return computed(() => {
    changes();
    const c = control();
    if (!c?.errors || !c.touched) {
      return null;
    }
    const key = Object.keys(c.errors)[0];
    return overrides()[key] ?? DEFAULT_ERROR_MESSAGES[key] ?? 'Valor no válido';
  });
}
