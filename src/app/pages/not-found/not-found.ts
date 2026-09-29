import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../ui/atoms/button/button';
import { HeroLayout } from '../../ui/templates/hero-layout/hero-layout';

@Component({
  selector: 'app-not-found',
  imports: [HeroLayout, Button, RouterLink],
  template: `
    <app-hero-layout>
      <h1 class="t-hero__title">Página no encontrada</h1>
      <p class="t-hero__text">No encontramos la página que buscas.</p>
      <a appButton variant="primary-inverse" routerLink="/">Volver al inicio</a>
    </app-hero-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
