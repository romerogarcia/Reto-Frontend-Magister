import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: '<i [class]="classes()" aria-hidden="true"></i>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'a-icon' },
})
export class Icon {
  readonly name = input.required<string>();
  readonly variant = input<'solid' | 'regular'>('solid');
  readonly size = input<'md' | 'lg'>('md');

  protected readonly classes = computed(
    () => `fa-${this.variant()} fa-${this.name()}${this.size() === 'lg' ? ' fa-lg' : ''}`,
  );
}
