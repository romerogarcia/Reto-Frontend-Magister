import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ErrorMessages, errorMessageOf } from '../../../forms/error-messages';

@Component({
  selector: 'app-form-field',
  template: `
    <label class="m-form-field__label" [class.u-visually-hidden]="hideLabel()" [for]="for()">
      {{ label() }}
      @if (hint()) {
        <span class="m-form-field__hint">{{ hint() }}</span>
      }
    </label>
    <ng-content />
    @if (error(); as message) {
      <p class="m-form-field__error" role="alert" [id]="for() + '-error'">{{ message }}</p>
    }
  `,
  styleUrl: './form-field.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'm-form-field' },
})
export class FormField {
  readonly label = input.required<string>();
  /** id del control al que apunta la etiqueta. */
  readonly for = input.required<string>();
  readonly hint = input<string>();
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly control = input<AbstractControl>();
  readonly messages = input<ErrorMessages>({});

  protected readonly error = errorMessageOf(this.control, this.messages);
}
