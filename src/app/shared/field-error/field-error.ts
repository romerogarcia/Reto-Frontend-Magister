import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { startWith, switchMap } from 'rxjs';

const MESSAGES: Record<string, string> = {
  required: 'Campo obligatorio',
  email: 'Email no válido',
  dniNie: 'DNI/NIE no válido',
  mobile: 'Móvil no válido',
  postalCode: 'Código postal no válido',
};

/** Muestra el primer error de un control cuando ya se ha tocado. */
@Component({
  selector: 'app-field-error',
  template: `
    @if (message(); as text) {
      <small class="form-error" role="alert">{{ text }}</small>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldError {
  readonly control = input.required<AbstractControl>();
  /** Permite personalizar el texto de un error concreto. */
  readonly messages = input<Record<string, string>>({});

  // Reacciona a cualquier cambio de valor, estado o "touched" del control.
  private readonly changes = toSignal(
    toObservable(this.control).pipe(switchMap((c) => c.events.pipe(startWith(null)))),
  );

  protected readonly message = computed(() => {
    this.changes();
    const control = this.control();
    if (!control.errors || !control.touched) {
      return null;
    }
    const key = Object.keys(control.errors)[0];
    return this.messages()[key] ?? MESSAGES[key] ?? 'Valor no válido';
  });
}
