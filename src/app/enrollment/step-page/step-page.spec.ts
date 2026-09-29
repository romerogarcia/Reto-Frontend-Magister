import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { EnrollmentStore } from '../enrollment.store';
import { RateStep } from '../steps/rate/rate';
import { SpecializationStep } from '../steps/specialization/specialization';

describe('StepPage (lógica común de los pasos)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('recupera los datos guardados del paso', async () => {
    TestBed.inject(EnrollmentStore).save('rate', { tarifaId: 'mensualidad' });
    const fixture = TestBed.createComponent(RateStep);
    await fixture.whenStable();
    const selected = (fixture.nativeElement as HTMLElement).querySelector('[aria-checked=true]');
    expect(selected?.textContent).toContain('SOLO MENSUALIDAD');
  });

  it('calcula título, "Volver atrás" y texto del botón a partir de STEPS', async () => {
    const fixture = TestBed.createComponent(RateStep);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Selecciona tu tarifa');
    expect(el.querySelector('.m-step-actions__back')?.getAttribute('href')).toBe('/modality');
    expect(el.querySelector('.m-step-actions .a-button')?.textContent?.trim()).toBe('Siguiente');
  });

  it('el primer paso vuelve a la portada', async () => {
    const fixture = TestBed.createComponent(SpecializationStep);
    await fixture.whenStable();
    const back = (fixture.nativeElement as HTMLElement).querySelector('.m-step-actions__back');
    expect(back?.getAttribute('href')).toBe('/');
  });

  it('al enviar un paso válido lo guarda y navega al siguiente', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(RateStep);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('[role=radio]')!.click();
    el.querySelector<HTMLButtonElement>('.m-step-actions .a-button')!.click();
    expect(TestBed.inject(EnrollmentStore).get('rate')).toEqual({ tarifaId: 'semi-mes' });
    expect(navigate).toHaveBeenCalledWith(['/', 'data']);
  });
});
