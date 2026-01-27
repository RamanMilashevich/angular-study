import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AppIfDirective } from './app-if';

describe('AppIfDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<unknown>;
    const viewContainer = {
      createEmbeddedView: () => {},
      clear: () => {},
    } as unknown as ViewContainerRef;

    const directive = new AppIfDirective(templateRef, viewContainer);
    expect(directive).toBeTruthy();
  });
});
