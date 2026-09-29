import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  template: `
    <ng-content select="[layoutAside]" />
    <main class="t-sidebar-layout__main">
      <h1 class="t-sidebar-layout__title">{{ title() }}</h1>
      <div class="t-sidebar-layout__content"><ng-content /></div>
    </main>
  `,
  styleUrl: './sidebar-layout.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 't-sidebar-layout' },
})
export class SidebarLayout {
  readonly title = input.required<string>();
}
