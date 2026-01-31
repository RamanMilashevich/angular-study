import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'signal-output-example',
  standalone: true,
  template: `<button type="button" class="btn" (click)="send()">Emit</button>`,
})
export class SignalOutputExampleComponent {
  readonly clicked = output<string>();

  send(): void {
    this.clicked.emit('Hello from output signal');
  }
}

@Component({
  selector: 'signal-outputs-demo',
  standalone: true,
  imports: [SignalOutputExampleComponent],
  template: `
    <section class="example">
      <h3>3) Output signals</h3>
      <signal-output-example (clicked)="lastOutput.set($event)"></signal-output-example>
      <p class="hint">Last event: {{ lastOutput() }}</p>
    </section>
  `,
})
export class SignalOutputsDemoComponent {
  readonly lastOutput = signal('None yet');
}
