import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AppUnlessDirective } from './app-unless';

describe('AppUnlessDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<unknown>;
    const viewContainer = {
      createEmbeddedView: () => {},
      clear: () => {},
    } as unknown as ViewContainerRef;

    const directive = new AppUnlessDirective(templateRef, viewContainer);
    expect(directive).toBeTruthy();
  });
});
