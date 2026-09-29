import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ErrorMessages, errorMessageOf } from '../../../forms/error-messages';
import { InfoLink } from '../../atoms/info-link/info-link';

@Component({
  selector: 'fieldset[appFieldset]',
  imports: [InfoLink],
  template: `
    <legend class="m-fieldset__legend">{{ legend() }}</legend>
    @if (hint()) {
      <p class="m-fieldset__hint">{{ hint() }}</p>
    }
    @if (info()) {
      <app-info-link class="m-fieldset__info">{{ info() }}</app-info-link>
    }
    <div class="m-fieldset__content"><ng-content /></div>
    @if (error(); as message) {
      <p class="m-fieldset__error" role="alert">{{ message }}</p>
    }
  `,
  styleUrl: './fieldset.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'm-fieldset' },
})
export class Fieldset {
  readonly legend = input.required<string>();
  readonly hint = input<string>();
  /** Texto informativo con flecha bajo el título. */
  readonly info = input<string>();
  readonly control = input<AbstractControl>();
  readonly messages = input<ErrorMessages>({ required: 'Selecciona una opción' });

  protected readonly error = errorMessageOf(this.control, this.messages);
}
