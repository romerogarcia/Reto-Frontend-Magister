import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Logo } from '../../atoms/logo/logo';

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
