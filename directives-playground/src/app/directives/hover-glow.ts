import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverGlow]',
  standalone: true,
})
export class HoverGlowDirective {
  @Input('appHoverGlow') glow = '0 0 12px #38bdf8';

  @HostBinding('style.boxShadow')
  boxShadow = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.boxShadow = this.glow;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.boxShadow = '';
  }
}
