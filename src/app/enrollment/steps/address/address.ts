import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Control } from '../../../shared/ui/atoms/control/control';
import { Checkbox } from '../../../shared/ui/molecules/checkbox/checkbox';
import { FormField } from '../../../shared/ui/molecules/form-field/form-field';
import { COMUNIDADES } from '../../enrollment.data';
import { StepPage } from '../../step-page/step-page';
import { postalCodeValidator } from '../../validators/spanish-validators';

@Component({
  selector: 'app-address-step',
  imports: [ReactiveFormsModule, StepPage, FormField, Control, Checkbox],
  templateUrl: './address.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressStep {
  protected readonly comunidades = COMUNIDADES;

  protected readonly form = inject(FormBuilder).nonNullable.group({
    comunidad: ['', Validators.required],
    direccion: ['', Validators.required],
    localidad: ['', Validators.required],
    provincia: ['', Validators.required],
    cp: ['', [Validators.required, postalCodeValidator]],
    aceptaLegal: [false, Validators.requiredTrue],
    aceptaPrivacidad: [false, Validators.requiredTrue],
  });
}
