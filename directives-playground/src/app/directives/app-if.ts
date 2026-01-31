import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

type AppIfView = 'then' | 'else' | null;

@Directive({
  selector: '[appIf]',
  standalone: true,
})
export class AppIfDirective {
  private elseTemplate: TemplateRef<unknown> | null = null;
  private currentView: AppIfView = null;

  constructor(
    private readonly templateRef: TemplateRef<unknown>, // the blueprint of the element the directive is applied to
    private readonly viewContainer: ViewContainerRef, // where we put our refrerence
  ) {}

  @Input()
  set appIf(condition: boolean) {
    if (condition) {
      this.renderThen();
      return;
    }

    this.renderElse();
  }

  @Input()
  set appIfElse(template: TemplateRef<unknown> | null) {
    this.elseTemplate = template;
    if (this.currentView === 'else') {
      this.renderElse();
    }
  }

  private renderThen(): void {
    if (this.currentView === 'then') {
      return;
    }

    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.currentView = 'then';
  }

  private renderElse(): void {
    if (this.currentView === 'else') {
      return;
    }

    this.viewContainer.clear();

    if (this.elseTemplate) {
      this.viewContainer.createEmbeddedView(this.elseTemplate);
      this.currentView = 'else';
      return;
    }

    this.currentView = null;
  }
}
