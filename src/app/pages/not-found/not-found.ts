import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="containerNotFound">
      <h2 class="containerNotFound__title">A small problem has occurred</h2>
      <p>We can't find the detail of this page ☠️</p>
      <a class="containerNotFound__linkBack" routerLink="/"></a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
