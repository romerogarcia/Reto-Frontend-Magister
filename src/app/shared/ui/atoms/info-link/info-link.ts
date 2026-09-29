import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Icon } from '../icon/icon';

/** Átomo texto informativo con flecha ("Consulta condiciones →"). */
@Component({
  selector: 'app-info-link',
  imports: [Icon],
  template: '<ng-content /><app-icon class="a-info-link__arrow" name="arrow-right" size="lg" />',
  styleUrl: './info-link.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'a-info-link' },
})
export class InfoLink {}
