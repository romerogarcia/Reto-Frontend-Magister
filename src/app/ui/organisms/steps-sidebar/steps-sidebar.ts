import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { STEPS } from '../../../core/enrollment.data';
import { Icon } from '../../atoms/icon/icon';
import { Logo } from '../../atoms/logo/logo';

/**
 * Organismo panel de progreso de la matrícula.
 * - Escritorio: columna azul con logo, lista de pasos e ilustración.
 * - Móvil/tablet: cabecera compacta con logo, paso actual y barra de progreso.
 */
@Component({
  selector: 'app-steps-sidebar',
  imports: [Icon, Logo, RouterLink],
  templateUrl: './steps-sidebar.html',
  styleUrl: './steps-sidebar.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'o-steps-sidebar' },
})
export class StepsSidebar {
  /** Índice del paso actual (0 = especialización). */
  readonly current = input.required<number>();

  protected readonly steps = STEPS;
  protected readonly step = computed(() => STEPS[this.current()]);
  protected readonly progress = computed(() =>
    Math.round(((this.current() + 1) / STEPS.length) * 100),
  );
}
