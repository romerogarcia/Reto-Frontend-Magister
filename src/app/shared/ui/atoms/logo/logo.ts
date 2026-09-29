import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { Icon } from '../icon/icon';

/** Átomo logotipo de Magister (icono + nombre). */
@Component({
  selector: 'app-logo',
  imports: [Icon],
  template: `
    <app-icon class="a-logo__mark" name="landmark" />
    <span class="a-logo__text">Magister</span>
  `,
  styleUrl: './logo.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"a-logo a-logo--" + size()' },
})
export class Logo {
  readonly size = input<'md' | 'lg'>('md');
}
