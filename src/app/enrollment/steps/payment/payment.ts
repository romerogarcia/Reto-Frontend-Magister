import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InfoLink } from '../../../shared/ui/atoms/info-link/info-link';
import { ChoiceGroup, ChoiceOption } from '../../../shared/ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../../shared/ui/molecules/fieldset/fieldset';
import { METODOS_PAGO } from '../../enrollment.data';
import { PaymentMethod } from '../../enrollment.model';
import { StepPage } from '../../step-page/step-page';

@Component({
  selector: 'app-payment-step',
  imports: [ReactiveFormsModule, StepPage, Fieldset, ChoiceGroup, InfoLink],
  template: `
    <app-step-page step="payment" [formGroup]="form">
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
    </app-step-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStep {
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
}
