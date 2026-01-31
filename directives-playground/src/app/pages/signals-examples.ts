import { Component } from '@angular/core';
import { SignalInputsDemoComponent } from './examples/input-signals-example';
import { SignalModelDemoComponent } from './examples/model-signals-example';
import { SignalOutputsDemoComponent } from './examples/output-signals-example';
import { SignalRxjsInteropExampleComponent } from './examples/rxjs-interop-example';
import { SignalStateComputedEffectExampleComponent } from './examples/state-computed-effect-example';

@Component({
  selector: 'signal-examples',
  standalone: true,
  imports: [
    SignalStateComputedEffectExampleComponent,
    SignalInputsDemoComponent,
    SignalOutputsDemoComponent,
    SignalModelDemoComponent,
    SignalRxjsInteropExampleComponent,
  ],
  template: `
    <signal-state-computed-effect></signal-state-computed-effect>
    <signal-inputs-demo></signal-inputs-demo>
    <signal-outputs-demo></signal-outputs-demo>
    <signal-model-demo></signal-model-demo>
    <signal-rxjs-interop></signal-rxjs-interop>
  `,
})
export class SignalExamplesComponent {}
