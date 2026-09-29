import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';

import { ErrorMessages, errorMessageOf } from '../../../core/forms/error-messages';

let nextId = 0;

/**
 * Molécula casilla con texto y mensaje de error propio.
 *   <app-checkbox formControlName="acepta">Acepto la <em>información legal</em></app-checkbox>
 */
@Component({
  selector: 'app-checkbox',
  template: `
    <label class="m-checkbox__row">
      <input
        type="checkbox"
        class="a-checkbox"
        [id]="id"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.aria-invalid]="!!error()"
        [attr.aria-describedby]="error() ? id + '-error' : null"
        (change)="toggle($event)"
        (blur)="onTouched()"
      />
      <span class="m-checkbox__label"><ng-content /></span>
    </label>
    @if (error(); as message) {
      <p class="m-checkbox__error" role="alert" [id]="id + '-error'">{{ message }}</p>
    }
  `,
  styleUrl: './checkbox.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'm-checkbox' },
})
export class Checkbox implements ControlValueAccessor, AfterContentInit {
  readonly messages = input<ErrorMessages>({ required: 'Debes aceptarla' });

  protected readonly id = `checkbox-${nextId++}`;
  protected readonly checked = signal(false);
  protected readonly disabled = signal(false);

  // Se registra como value accessor de su propio NgControl (patrón de Angular Material),
  // así puede leer el estado de validación y mostrar el error.
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly control = signal<AbstractControl | null>(null);
  protected readonly error = errorMessageOf(this.control, this.messages);

  private onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this.control.set(this.ngControl?.control ?? null);
  }

  protected toggle(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.checked.set(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
