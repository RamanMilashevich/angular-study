import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'signal-rxjs-interop',
  standalone: true,
  template: `
    <section class="example">
      <h3>5) RxJS interop</h3>
      <p>Signal from observable: {{ data().join(', ') }}</p>
      <p>Observable from signal (latest): {{ latestFromObservable() }}</p>
    </section>
  `,
})
export class SignalRxjsInteropExampleComponent {
  readonly count = signal(0);
  readonly data = toSignal(of(['alpha', 'beta', 'gamma']), { initialValue: [] as string[] });
  readonly latestFromObservable = signal(0);

  private readonly count$ = toObservable(this.count);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.count$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.latestFromObservable.set(value));
  }
}
