import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input() public cssSelector: string;
  @Output() public clickOutside = new EventEmitter<void>();
  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement: HTMLElement): void {
    if (!targetElement.matches(this.cssSelector)) {
      this.clickOutside.emit();
    }
  }
}
