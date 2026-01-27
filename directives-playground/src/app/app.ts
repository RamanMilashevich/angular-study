import { Component, signal } from '@angular/core';
import { AppIfDirective } from './directives/app-if';
import { HighlightDirective } from './directives/highlight';
import { HoverGlowDirective } from './directives/hover-glow';
import { HoverHighlightDirective } from './directives/hover-highlight';

@Component({
  selector: 'app-root',
  imports: [AppIfDirective, HighlightDirective, HoverGlowDirective, HoverHighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('directives-playground');
  protected readonly favoriteColor = signal('lightgreen');
  protected readonly showTip = signal(true);

  toggleTip(): void {
    this.showTip.update((current) => !current);
  }
}
