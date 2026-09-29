import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { METODOS_PAGO } from '../../core/enrollment.data';
import { PaymentMethod } from '../../core/enrollment.model';
import { EnrollmentStore } from '../../core/enrollment.store';
import { InfoLink } from '../../ui/atoms/info-link/info-link';
import { ChoiceGroup, ChoiceOption } from '../../ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../ui/molecules/fieldset/fieldset';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { StepLayout } from '../../ui/templates/step-layout/step-layout';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, StepLayout, Fieldset, ChoiceGroup, InfoLink, StepActions],
  template: `
    <app-step-layout [step]="5">
      <form class="l-stack" [formGroup]="form" (ngSubmit)="send()" novalidate>
        <fieldset
          appFieldset
          legend="¿Cómo prefieres abonar tu primer pago?"
          info="Detalles sobre forma de pago y proceso post pago"
          [control]="form.controls.metodo"
        >
          <app-choice-group formControlName="metodo" layout="grid" [options]="metodos" />
        </fieldset>

        <fieldset
          appFieldset
          legend="¿Vienes recomendado por alguien?"
          [control]="form.controls.recomendado"
        >
          <app-choice-group formControlName="recomendado" [options]="recomendadoOptions" />
        </fieldset>

        <app-info-link>Ver información legal</app-info-link>

        <app-step-actions label="Enviar" backLink="/address" />
      </form>
    </app-step-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly metodos = METODOS_PAGO;
  protected readonly recomendadoOptions: ChoiceOption<boolean>[] = [
    { value: false, label: 'No' },
    { value: true, label: 'Sí' },
  ];

  protected readonly form = this.fb.group({
    metodo: this.fb.control<PaymentMethod | null>(null, Validators.required),
    recomendado: this.fb.control<boolean | null>(null, Validators.required),
  });

  constructor() {
    const saved = this.store.get('payment');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { metodo, recomendado } = this.form.getRawValue();
    this.store.save('payment', { metodo: metodo!, recomendado: recomendado! });
    if (this.store.submit()) {
      this.router.navigate(['/final']);
    }
  }
}
