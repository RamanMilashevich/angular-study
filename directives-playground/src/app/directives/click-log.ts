import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickLog]',
  standalone: true,
})
export class ClickLogDirective {
  @Input('appClickLog') label = 'clicked';

  @Output() appClickLogEvent = new EventEmitter<string>();

  @HostListener('click')
  onClick(): void {
    this.appClickLogEvent.emit(this.label);
  }
}
