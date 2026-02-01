import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, of } from 'rxjs';

@Component({
  selector: 'signal-rxjs-interop',
  standalone: true,
  template: `
    <section class="example">
      <h3>5) RxJS interop</h3>
      <p class="hint">Signal from observable: {{ data() }}</p>
      <div class="stack">
        <label>
          Filter list
          <input
            type="text"
            [value]="filter()"
            (input)="filter.set($any($event.target).value)"
          />
        </label>
        <p>Filtered (observable → signal): {{ filtered().join(', ') }}</p>
      </div>
      <div class="stack">
        <p>Observable from signal (latest count): {{ latestFromObservable() }}</p>
        <div class="color-row">
          <button class="chip" type="button" (click)="inc()">+1</button>
          <button class="chip" type="button" (click)="dec()">-1</button>
        </div>
      </div>
    </section>
  `,
})
export class SignalRxjsInteropExampleComponent {
  readonly count = signal(0);
  readonly data = toSignal(of(['alpha', 'beta', 'gamma', 'delta', 'epsilon']), {
    initialValue: [] as string[],
  });
  readonly filter = signal('');
  readonly normalizedFilter = computed(() => this.filter().trim().toLowerCase());
  readonly latestFromObservable = signal(0);

  private readonly count$ = toObservable(this.count);
  private readonly destroyRef = inject(DestroyRef);
  private readonly data$ = toObservable(this.data);
  private readonly filter$ = toObservable(this.normalizedFilter);

  readonly filtered = toSignal(
    combineLatest([this.data$, this.filter$]).pipe(
      map(([items, filter]) =>
        filter ? items.filter((item) => item.toLowerCase().includes(filter)) : items
      )
    ),
    { initialValue: [] as string[] }
  );

  constructor() {
    this.count$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.latestFromObservable.set(value));
  }

  inc(): void {
    this.count.update((current) => current + 1);
  }

  dec(): void {
    this.count.update((current) => current - 1);
  }
}
