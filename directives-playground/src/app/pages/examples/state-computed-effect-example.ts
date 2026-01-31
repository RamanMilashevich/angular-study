import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'signal-state-computed-effect',
  standalone: true,
  template: `
    <section class="example">
      <h3>1) State + computed + effect</h3>
      <p>Count: <strong>{{ count() }}</strong></p>
      <p>Double: <strong>{{ double() }}</strong></p>
      <button class="btn" type="button" (click)="inc()">+</button>
      <button class="btn" type="button" (click)="dec()">-</button>
      <p class="hint">Effect log: {{ effectLog() }}</p>
    </section>
  `,
})
export class SignalStateComputedEffectExampleComponent {
  readonly count = signal(0);
  readonly effectLog = signal('Waiting for changes');
  readonly double = computed(() => this.count() * 2);

  constructor() {
    effect(
      () => {
        const value = this.count();
        this.effectLog.set(`Effect saw count = ${value}`);
      },
      { allowSignalWrites: true }
    );
  }

  inc(): void {
    this.count.update((current) => current + 1);
  }

  dec(): void {
    this.count.update((current) => current - 1);
  }
}
