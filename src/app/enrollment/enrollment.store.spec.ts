import { TestBed } from '@angular/core/testing';

import { EnrollmentStore } from './enrollment.store';

describe('EnrollmentStore', () => {
  let store: EnrollmentStore;

  beforeEach(() => {
    sessionStorage.clear();
    store = TestBed.inject(EnrollmentStore);
  });

  it('empieza en el primer paso', () => {
    expect(store.firstPendingStep()).toBe(0);
    expect(store.canAccess(0)).toBe(true);
    expect(store.canAccess(1)).toBe(false);
  });

  it('desbloquea el siguiente paso al guardar el actual', () => {
    store.save('specialization', {
      rama: 'Maestros - Audición y lenguajes',
      provincia: 'Madrid',
      exAlumno: 'no',
      material: 'Material mes a mes',
    });
    expect(store.firstPendingStep()).toBe(1);
    expect(store.canAccess(1)).toBe(true);
    expect(store.canAccess(2)).toBe(false);
  });

  it('no permite enviar hasta completar todos los pasos', () => {
    expect(store.submit()).toBe(false);
    expect(store.submitted()).toBe(false);
  });

  it('persiste el estado en sessionStorage', () => {
    store.save('rate', { tarifaId: 'mensualidad' });
    TestBed.tick();
    expect(sessionStorage.getItem('magister-enrollment')).toContain('mensualidad');
  });

  it('reset vuelve al estado inicial', () => {
    store.save('rate', { tarifaId: 'mensualidad' });
    store.reset();
    expect(store.get('rate')).toBeNull();
  });
});
