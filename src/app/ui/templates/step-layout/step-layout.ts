import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { STEPS } from '../../../core/enrollment.data';
import { Icon } from '../../atoms/icon/icon';
import { StepsSidebar } from '../../organisms/steps-sidebar/steps-sidebar';

/**
 * Plantilla de los pasos del formulario: panel de progreso + contenido.
 *   <app-step-layout [step]="2"> ...formulario... </app-step-layout>
 */
@Component({
  selector: 'app-step-layout',
  imports: [Icon, StepsSidebar],
  template: `
    <app-steps-sidebar class="t-step-layout__aside" [current]="step()" />
    <main class="t-step-layout__main">
      <div class="t-step-layout__menu"><app-icon name="bars" /></div>
      <h1 class="t-step-layout__title">{{ title() }}</h1>
      <div class="t-step-layout__content"><ng-content /></div>
    </main>
  `,
  styleUrl: './step-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 't-step-layout' },
})
export class StepLayout {
  readonly step = input.required<number>();
  protected readonly title = computed(() => STEPS[this.step()].title);
}
