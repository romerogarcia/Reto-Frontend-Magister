import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

import { StepActions } from '../../shared/ui/molecules/step-actions/step-actions';
import { StepsSidebar } from '../../shared/ui/organisms/steps-sidebar/steps-sidebar';
import { SidebarLayout } from '../../shared/ui/templates/sidebar-layout/sidebar-layout';
import { SIDEBAR_STEPS, STEPS } from '../enrollment.data';
import { Enrollment, StepKey } from '../enrollment.model';
import { EnrollmentStore } from '../enrollment.store';

/**
 * Página de un paso de la matrícula. Contiene TODA la lógica común a los pasos,
 * así cada paso solo declara su formulario y sus campos:
 *
 *   <app-step-page step="rate" [formGroup]="form">
 *     ...campos con formControlName...
 *   </app-step-page>
 *
 * - Recupera los datos guardados del paso al entrar.
 * - Al enviar: valida, guarda en el store y navega al paso siguiente
 *   (o envía la matrícula si es el último).
 * - Calcula título, ilustración, "Volver atrás" y progreso a partir de STEPS.
 *
 * El [formGroup] va en el propio elemento para que los formControlName del
 * contenido proyectado encuentren su formulario.
 */
@Component({
  selector: 'app-step-page[formGroup]',
  imports: [SidebarLayout, StepsSidebar, StepActions],
  template: `
    <app-sidebar-layout [title]="config().title">
      <app-steps-sidebar
        layoutAside
        label="Pasos de la matrícula"
        [steps]="sidebarSteps"
        [current]="index()"
        [image]="config().image"
      />
      <form class="l-stack" novalidate>
        <ng-content />
        <app-step-actions [label]="isLast() ? 'Enviar' : 'Siguiente'" [backLink]="backLink()" />
      </form>
    </app-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepPage implements OnInit {
  readonly step = input.required<StepKey>();

  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly formDirective = inject(FormGroupDirective, { self: true });

  protected readonly sidebarSteps = SIDEBAR_STEPS;
  protected readonly index = computed(() => STEPS.findIndex((s) => s.key === this.step()));
  protected readonly config = computed(() => STEPS[this.index()]);
  protected readonly isLast = computed(() => this.index() === STEPS.length - 1);
  protected readonly backLink = computed(() =>
    this.index() === 0 ? '/' : `/${STEPS[this.index() - 1].path}`,
  );

  constructor() {
    // El envío del <form> interno burbujea hasta el FormGroupDirective del host.
    this.formDirective.ngSubmit.pipe(takeUntilDestroyed()).subscribe(() => this.submit());
  }

  ngOnInit(): void {
    const saved = this.store.get(this.step());
    if (saved) {
      this.formDirective.form.patchValue(saved);
    }
  }

  private submit(): void {
    const form = this.formDirective.form;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    // Cada paso tipa su formulario según su modelo; aquí se trata de forma genérica.
    this.store.save(this.step(), form.getRawValue() as NonNullable<Enrollment[StepKey]>);

    if (this.isLast()) {
      if (this.store.submit()) {
        this.router.navigate(['/final']);
      }
      return;
    }
    this.router.navigate(['/', STEPS[this.index() + 1].path]);
  }
}
