import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'primary-inverse' | 'option' | 'soft';

@Component({
  selector: 'button[appButton], a[appButton]',
  template: '<ng-content />',
  styleUrl: './button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly block = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    [
      'a-button',
      `a-button--${this.variant()}`,
      this.selected() && 'a-button--selected',
      this.block() && 'a-button--block',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
