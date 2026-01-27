import { Component, signal } from '@angular/core';
import { HighlightDirective } from './directives/highlight';
import { HoverHighlightDirective } from './directives/hover-highlight';

@Component({
  selector: 'app-root',
  imports: [HighlightDirective, HoverHighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('directives-playground');
  protected readonly favoriteColor = signal('lightgreen');
}
