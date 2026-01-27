import { Component, signal } from '@angular/core';
import { HighlightDirective } from './directives/highlight';
import { HoverHighlightDirective } from './directives/hover-highlight';
import { HoverGlowDirective } from './directives/hover-glow';

@Component({
  selector: 'app-root',
  imports: [HighlightDirective, HoverHighlightDirective, HoverGlowDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('directives-playground');
  protected readonly favoriteColor = signal('lightgreen');
}
