import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true, // Añade esta línea
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value.toUpperCase();

    // Actualiza el valor del control
    this.ngControl.control?.setValue(newValue, {
      emitEvent: false,
    });
  }
}
