import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true,
})
export class HoverHighlightDirective {
  @Input('appHoverHighlight') hoverColor = 'plum';

  @HostBinding('style.backgroundColor')
  background = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.background = this.hoverColor;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.background = '';
  }
}
