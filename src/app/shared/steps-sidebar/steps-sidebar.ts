import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { STEPS } from '../../core/enrollment.data';

/**
 * Panel lateral azul con el logo, la lista de pasos y la ilustración.
 * Se usa como atributo (<section appStepsSidebar>) para no añadir
 * elementos extra al DOM y conservar exactamente el diseño original.
 */
@Component({
  selector: 'section[appStepsSidebar]',
  templateUrl: './steps-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'block()' },
})
export class StepsSidebar {
  /** Índice del paso actual (0 = especialización). */
  readonly current = input.required<number>();

  protected readonly steps = STEPS;
  protected readonly step = computed(() => STEPS[this.current()]);
  protected readonly block = computed(() => this.step().sidebarBlock);
}
