import { Component, computed, input, signal } from '@angular/core';
import { SignalExamplesComponent } from './signals-examples';

@Component({
  selector: 'signal-badge',
  standalone: true,
  template: `
    <span class="badge" [style.borderColor]="color()" [style.color]="color()">
      {{ label() }}
    </span>
  `,
})
export class SignalBadgeComponent {
  readonly label = input('');
  readonly color = input('#38bdf8');
}

@Component({
  selector: 'app-signals-page',
  standalone: true,
  imports: [SignalBadgeComponent, SignalExamplesComponent],
  templateUrl: './signals-page.html',
  styleUrl: './signals-page.css'
})
export class SignalsPage {
  protected readonly count = signal(0);
  protected readonly step = signal(1);
  protected readonly name = signal('Angular');
  protected readonly lastUpdate = signal('Never');
  protected readonly lastAction = signal('No changes yet');

  protected readonly doubleCount = computed(() => this.count() * 2);
  protected readonly isEven = computed(() => this.count() % 2 === 0);

  increment(): void {
    this.count.update((current) => current + this.step());
    this.recordChange();
  }

  decrement(): void {
    this.count.update((current) => current - this.step());
    this.recordChange();
  }

  reset(): void {
    this.count.set(0);
    this.recordChange('Reset to 0');
  }

  updateStep(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.step.set(Number.isNaN(value) ? 1 : value);
  }

  updateName(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value.trim() || 'Angular');
  }

  private recordChange(message?: string): void {
    const value = this.count();
    this.lastUpdate.set(new Date().toLocaleTimeString());
    this.lastAction.set(message ?? `Count changed to ${value}`);
  }
}
