import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Logo } from '../../atoms/logo/logo';

/**
 * Plantilla de pantalla completa sobre fondo de marca (inicio y confirmación).
 * Proyecta el contenido; usa los elementos t-hero__title y t-hero__text.
 */
@Component({
  selector: 'app-hero-layout',
  imports: [Logo],
  template: `
    <main class="t-hero__content">
      <app-logo class="t-hero__logo" size="lg" />
      <ng-content />
    </main>
  `,
  styleUrl: './hero-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 't-hero' },
})
export class HeroLayout {}
