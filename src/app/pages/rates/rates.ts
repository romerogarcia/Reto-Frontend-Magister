import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TARIFAS } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { ChoiceGroup, ChoiceOption } from '../../ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../ui/molecules/fieldset/fieldset';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { StepLayout } from '../../ui/templates/step-layout/step-layout';

const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

@Component({
  selector: 'app-rates',
  imports: [ReactiveFormsModule, StepLayout, Fieldset, ChoiceGroup, StepActions],
  template: `
    <app-step-layout [step]="2">
      <form class="l-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
        <fieldset
          appFieldset
          legend="Tarifas"
          hint="(Selecciona una opción)"
          [control]="form.controls.tarifaId"
          [messages]="{ required: 'Selecciona una tarifa' }"
        >
          <app-choice-group formControlName="tarifaId" layout="stack" [options]="options" />
        </fieldset>

        <app-step-actions backLink="/modality" />
      </form>
    </app-step-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);

  protected readonly options: ChoiceOption<string>[] = TARIFAS.map((t) => ({
    value: t.id,
    label: t.descripcion,
    detail: `Matrícula ${euros.format(t.precio)}`,
  }));

  protected readonly form = inject(FormBuilder).nonNullable.group({
    tarifaId: [this.store.get('rate')?.tarifaId ?? '', Validators.required],
  });

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('rate', this.form.getRawValue());
    this.router.navigate(['/data']);
  }
}
