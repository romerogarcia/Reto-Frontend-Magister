import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { EnrollmentStore } from '../../core/enrollment.store';
import { DataPage } from './data';

describe('DataPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ imports: [DataPage], providers: [provideRouter([])] });
  });

  const type = (el: HTMLElement, selector: string, value: string) => {
    const input = el.querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const submit = (el: HTMLElement) =>
    el.querySelector<HTMLButtonElement>('.m-step-actions .a-button--primary')!.click();

  it('muestra errores y no avanza si el formulario es inválido', async () => {
    const fixture = TestBed.createComponent(DataPage);
    const el = fixture.nativeElement as HTMLElement;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    await fixture.whenStable();

    submit(el);
    await fixture.whenStable();

    expect(el.querySelectorAll('.m-form-field__error').length).toBe(4);
    expect(el.querySelectorAll('.a-control--invalid').length).toBe(4);
    expect(el.querySelector('#dni')?.getAttribute('aria-describedby')).toBe('dni-error');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('guarda los datos y navega a dirección si son válidos', async () => {
    const fixture = TestBed.createComponent(DataPage);
    const el = fixture.nativeElement as HTMLElement;
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await fixture.whenStable();

    type(el, '#name', 'May García Sánchez');
    type(el, '#dni', '12345678Z');
    type(el, '#phone', '605 45 32 97');
    type(el, '#email', 'maygarcia@gmail.com');
    submit(el);

    expect(TestBed.inject(EnrollmentStore).get('personalData')?.dni).toBe('12345678Z');
    expect(navigate).toHaveBeenCalledWith(['/address']);
  });
});
