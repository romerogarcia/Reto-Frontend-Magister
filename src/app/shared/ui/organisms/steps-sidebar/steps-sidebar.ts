import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Icon } from '../../atoms/icon/icon';
import { Logo } from '../../atoms/logo/logo';

export interface SidebarStep {
  label: string;
  link: string;
}

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
  readonly steps = input.required<readonly SidebarStep[]>();
  /** Índice del paso actual. */
  readonly current = input.required<number>();
  /** Ilustración decorativa del paso actual. */
  readonly image = input<string>();
  /** Nombre accesible de la navegación. */
  readonly label = input('Pasos');

  protected readonly currentStep = computed(() => this.steps()[this.current()]);
  protected readonly progress = computed(() =>
    Math.round(((this.current() + 1) / this.steps().length) * 100),
  );
}
