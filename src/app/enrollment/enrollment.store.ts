import { Injectable, computed, effect, signal } from '@angular/core';

import { STEPS } from './enrollment.data';
import { Enrollment, StepKey } from './enrollment.model';

const STORAGE_KEY = 'magister-enrollment';

const EMPTY: Enrollment = {
  specialization: null,
  modality: null,
  rate: null,
  personalData: null,
  address: null,
  payment: null,
  submitted: false,
};

/**
 * Estado del proceso de matrícula basado en signals.
 * Se persiste en sessionStorage para no perder los datos al recargar.
 */
@Injectable({ providedIn: 'root' })
export class EnrollmentStore {
  private readonly state = signal<Enrollment>(this.load());

  readonly enrollment = this.state.asReadonly();
  readonly submitted = computed(() => this.state().submitted);

  /** Índice del primer paso sin completar (o STEPS.length si están todos). */
  readonly firstPendingStep = computed(() => {
    const index = STEPS.findIndex((step) => this.state()[step.key] === null);
    return index === -1 ? STEPS.length : index;
  });

  readonly progress = computed(() => Math.round((this.firstPendingStep() / STEPS.length) * 100));

  constructor() {
    effect(() => this.persist(this.state()));
  }

  get<K extends StepKey>(key: K): Enrollment[K] {
    return this.state()[key];
  }

  save<K extends StepKey>(key: K, value: NonNullable<Enrollment[K]>): void {
    this.state.update((current) => ({ ...current, [key]: value, submitted: false }));
  }

  /** Un paso es accesible si todos los anteriores están completos. */
  canAccess(stepIndex: number): boolean {
    return stepIndex <= this.firstPendingStep();
  }

  submit(): boolean {
    if (this.firstPendingStep() < STEPS.length) {
      return false;
    }
    this.state.update((current) => ({ ...current, submitted: true }));
    return true;
  }

  reset(): void {
    this.state.set(EMPTY);
  }

  private load(): Enrollment {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Enrollment>) } : EMPTY;
    } catch {
      return EMPTY;
    }
  }

  private persist(value: Enrollment): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Sin almacenamiento disponible (modo privado, etc.): se mantiene solo en memoria.
    }
  }
}
