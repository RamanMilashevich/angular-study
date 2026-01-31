import { Component, signal } from '@angular/core';
import { AppIfDirective } from '../directives/app-if';
import { AppUnlessDirective } from '../directives/app-unless';
import { ClickLogDirective } from '../directives/click-log';
import { HighlightDirective } from '../directives/highlight';
import { HoverGlowDirective } from '../directives/hover-glow';
import { HoverHighlightDirective } from '../directives/hover-highlight';

@Component({
  selector: 'app-directives-page',
  standalone: true,
  imports: [
    AppIfDirective,
    AppUnlessDirective,
    ClickLogDirective,
    HighlightDirective,
    HoverGlowDirective,
    HoverHighlightDirective,
  ],
  templateUrl: './directives-page.html',
  styleUrl: './directives-page.css'
})
export class DirectivesPage {
  protected readonly favoriteColor = signal('lightgreen');
  protected readonly lastClickMessage = signal('None yet');
  protected readonly clickCount = signal(0);

  // structural directive toggles
  protected readonly showTip = signal(true);
  // here we toggle the tip visibility
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
