import { Component, model } from '@angular/core';

@Component({
  selector: 'signal-model-example',
  standalone: true,
  template: `
    <div class="stack">
      <input
        type="text"
        [value]="value()"
        (input)="value.set($any($event.target).value)"
      />
      <input
        type="text"
        [value]="value()"
        (input)="value.set($any($event.target).value)"
      />
      <p>Shared value: <strong>{{ value() }}</strong></p>
    </div>
  `,
})
export class SignalModelExampleComponent {
  readonly value = model('');
}

@Component({
  selector: 'signal-model-demo',
  standalone: true,
  imports: [SignalModelExampleComponent],
  template: `
    <section class="example">
      <h3>4) Model (two-way)</h3>
      <signal-model-example></signal-model-example>
    </section>
  `,
})
export class SignalModelDemoComponent {}
