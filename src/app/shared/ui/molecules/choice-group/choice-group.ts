import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  forwardRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Button, ButtonVariant } from '../../atoms/button/button';

export interface ChoiceOption<T = unknown> {
  value: T;
  label: string;
  detail?: string;
}

@Component({
  selector: 'app-choice-group',
  imports: [Button],
  template: `
    @for (option of options(); track $index; let i = $index) {
      <button
        #choice
        appButton
        type="button"
        role="radio"
        [variant]="variant()"
        [selected]="isSelected(option)"
        [block]="layout() !== 'inline'"
        [disabled]="disabled()"
        [attr.aria-checked]="isSelected(option)"
        [attr.tabindex]="tabIndexFor(i)"
        (click)="select(option.value)"
        (keydown)="onKeydown($event, i)"
        (blur)="onTouched()"
      >
        {{ option.label }}
        @if (option.detail) {
          <strong class="m-choice-group__detail">{{ option.detail }}</strong>
        }
      </button>
    }
  `,
  styleUrl: './choice-group.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChoiceGroup), multi: true },
  ],
  host: {
    role: 'radiogroup',
    '[class]': '"m-choice-group m-choice-group--" + layout()',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class ChoiceGroup<T> implements ControlValueAccessor {
  readonly options = input.required<readonly ChoiceOption<T>[]>();
  readonly layout = input<'inline' | 'grid' | 'stack'>('inline');
  readonly variant = input<ButtonVariant>('option');
  readonly ariaLabel = input<string>();

  protected readonly value = signal<T | null>(null);
  protected readonly disabled = signal(false);
  private readonly buttons = viewChildren('choice', { read: ElementRef<HTMLButtonElement> });

  private onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  protected isSelected(option: ChoiceOption<T>): boolean {
    return option.value === this.value();
  }

  /** Solo la opción elegida (o la primera) entra en el orden de tabulación. */
  protected tabIndexFor(index: number): number {
    const selected = this.options().findIndex((o) => this.isSelected(o));
    return index === (selected === -1 ? 0 : selected) ? 0 : -1;
  }

  protected select(value: T): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) {
      return;
    }
    event.preventDefault();
    const total = this.options().length;
    const next = (index + step + total) % total;
    this.select(this.options()[next].value);
    this.buttons()[next]?.nativeElement.focus();
  }

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
