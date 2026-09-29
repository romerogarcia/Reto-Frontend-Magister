import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ChoiceGroup, ChoiceOption } from '../../../shared/ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../../shared/ui/molecules/fieldset/fieldset';
import { TARIFAS } from '../../enrollment.data';
import { StepPage } from '../../step-page/step-page';

const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

@Component({
  selector: 'app-rate-step',
  imports: [ReactiveFormsModule, StepPage, Fieldset, ChoiceGroup],
  template: `
    <app-step-page step="rate" [formGroup]="form">
      <fieldset
        appFieldset
        legend="Tarifas"
        hint="(Selecciona una opción)"
        [control]="form.controls.tarifaId"
        [messages]="{ required: 'Selecciona una tarifa' }"
      >
        <app-choice-group formControlName="tarifaId" layout="stack" [options]="options" />
      </fieldset>
    </app-step-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateStep {
  protected readonly options: ChoiceOption<string>[] = TARIFAS.map((t) => ({
    value: t.id,
    label: t.descripcion,
    detail: `Matrícula ${euros.format(t.precio)}`,
  }));

  protected readonly form = inject(FormBuilder).nonNullable.group({
    tarifaId: ['', Validators.required],
  });
}
