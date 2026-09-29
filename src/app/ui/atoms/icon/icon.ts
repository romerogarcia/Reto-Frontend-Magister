import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Átomo icono (Font Awesome). Siempre decorativo: el texto que lo acompaña
 * es el que da significado.  <app-icon name="arrow-right" size="lg" />
 */
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
