import { Component, signal } from '@angular/core';
import { AppIfDirective } from './directives/app-if';
import { AppUnlessDirective } from './directives/app-unless';
import { ClickLogDirective } from './directives/click-log';
import { HighlightDirective } from './directives/highlight';
import { HoverGlowDirective } from './directives/hover-glow';
import { HoverHighlightDirective } from './directives/hover-highlight';

@Component({
  selector: 'app-root',
  imports: [
    AppIfDirective,
    AppUnlessDirective,
    ClickLogDirective,
    HighlightDirective,
    HoverGlowDirective,
    HoverHighlightDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('directives-playground');
  protected readonly favoriteColor = signal('lightgreen');
  protected readonly showTip = signal(true);
  protected readonly lastClickMessage = signal('None yet');
  protected readonly clickCount = signal(0);

  toggleTip(): void {
    this.showTip.update((current) => !current);
  }

  onLoggedClick(message: string): void {
    this.lastClickMessage.set(message);
    this.clickCount.update((count) => count + 1);
  }

  getClickLabel(): string {
    const time = new Date().toLocaleTimeString();
    return `Button clicked at ${time} (count: ${this.clickCount() + 1})`;
  }
}
