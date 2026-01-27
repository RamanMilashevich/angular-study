import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight';

class RendererStub implements Pick<Renderer2, 'setStyle'> {
  // Minimal stub: we only need setStyle for this directive.
  setStyle(): void {}
}

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const renderer = new RendererStub() as unknown as Renderer2;

    const directive = new HighlightDirective(elementRef, renderer);

    expect(directive).toBeTruthy();
  });
});
