import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'signal-input-example',
  standalone: true,
  template: `
    <p class="badge" [style.borderColor]="color()" [style.color]="color()">
      {{ label() }}
    </p>
  `,
})
export class SignalInputExampleComponent {
  readonly label = input('Default label');
  readonly color = input('#38bdf8');
}

@Component({
  selector: 'signal-inputs-demo',
  standalone: true,
  imports: [SignalInputExampleComponent],
  template: `
    <section class="example">
      <h3>2) Input signals</h3>
      <signal-input-example [label]="name()" [color]="color()"></signal-input-example>
      <input
        type="text"
        [value]="name()"
        (input)="name.set($any($event.target).value || 'Angular')"
      />
      <div class="color-row">
        <button class="chip" type="button" (click)="color.set('#38bdf8')">Blue</button>
        <button class="chip" type="button" (click)="color.set('#f97316')">Orange</button>
      </div>
    </section>
  `,
})
export class SignalInputsDemoComponent {
  readonly name = signal('Angular');
  readonly color = signal('#38bdf8');
}
