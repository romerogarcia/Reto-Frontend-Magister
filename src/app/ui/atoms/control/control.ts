import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Átomo control de formulario. Da estilo a <input> y <select> nativos y
 * refleja su estado de validación (clase BEM y atributos ARIA).
 *   <input appControl formControlName="email" id="email" />
 */
@Directive({
  selector: 'input[appControl], select[appControl]',
  host: {
    class: 'a-control',
    '[class.a-control--select]': 'isSelect',
    '[class.a-control--empty]': 'isSelect && !ngControl?.value',
    '[class.a-control--invalid]': 'invalid',
    '[attr.aria-invalid]': 'invalid',
    '[attr.aria-describedby]': 'invalid ? host.id + "-error" : null',
  },
})
export class Control {
  protected readonly ngControl = inject(NgControl, { self: true, optional: true });
  protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly isSelect = this.host.tagName === 'SELECT';

  protected get invalid(): boolean {
    return !!this.ngControl?.invalid && !!this.ngControl.touched;
  }
}
