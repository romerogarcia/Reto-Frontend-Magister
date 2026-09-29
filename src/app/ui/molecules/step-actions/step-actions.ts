import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../atoms/button/button';

/**
 * Molécula acciones de navegación: botón principal + enlace "Volver atrás".
 * Por defecto el botón es de tipo submit, para usarlo dentro de un <form>.
 */
@Component({
  selector: 'app-step-actions',
  imports: [Button, RouterLink],
  template: `
    <button
      appButton
      [variant]="inverse() ? 'primary-inverse' : 'primary'"
      [type]="type()"
      (click)="primary.emit()"
    >
      {{ label() }}
    </button>
    @if (backLink(); as link) {
      <a class="m-step-actions__back" [routerLink]="link">Volver atrás</a>
    }
  `,
  styleUrl: './step-actions.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'm-step-actions' },
})
export class StepActions {
  readonly label = input('Siguiente');
  readonly type = input<'submit' | 'button'>('submit');
  readonly backLink = input<string | null>(null);
  /** Para usar sobre fondos oscuros. */
  readonly inverse = input(false, { transform: booleanAttribute });
  /** Se emite al pulsar el botón principal (útil cuando type="button"). */
  readonly primary = output<void>();
}
