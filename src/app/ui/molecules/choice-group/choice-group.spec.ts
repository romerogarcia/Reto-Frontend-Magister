import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ChoiceGroup } from './choice-group';

@Component({
  imports: [ChoiceGroup, ReactiveFormsModule],
  template: `<app-choice-group [formControl]="control" [options]="options" />`,
})
class Host {
  control = new FormControl<string | null>('b');
  options = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ];
}

describe('ChoiceGroup', () => {
  const setup = async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, buttons: () => Array.from(el.querySelectorAll('button')) };
  };

  it('refleja el valor del FormControl', async () => {
    const { buttons } = await setup();
    expect(buttons().map((b) => b.getAttribute('aria-checked'))).toEqual([
      'false',
      'true',
      'false',
    ]);
    expect(buttons()[1].classList).toContain('a-button--selected');
  });

  it('actualiza el FormControl al hacer clic', async () => {
    const { fixture, buttons } = await setup();
    buttons()[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('c');
  });

  it('permite moverse con las flechas del teclado', async () => {
    const { fixture, buttons } = await setup();
    buttons()[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('c');
    buttons()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.control.value).toBe('a');
  });
});
