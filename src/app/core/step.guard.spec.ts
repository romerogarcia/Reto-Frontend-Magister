import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { EnrollmentStore } from './enrollment.store';
import { stepGuard } from './step.guard';

const routeFor = (path: string) => ({ routeConfig: { path } }) as unknown as ActivatedRouteSnapshot;

describe('stepGuard', () => {
  const run = (path: string) =>
    TestBed.runInInjectionContext(() => stepGuard(routeFor(path), {} as RouterStateSnapshot));

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    TestBed.inject(EnrollmentStore).reset();
  });

  it('deja entrar al primer paso', () => {
    expect(run('specialized')).toBe(true);
  });

  it('redirige al primer paso pendiente si se intenta saltar pasos', () => {
    const result = run('payment') as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/specialized');
  });
});
