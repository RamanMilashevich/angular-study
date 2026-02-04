import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  map,
  merge,
  of,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  timer,
  retry,
  withLatestFrom,
} from 'rxjs';
import { UsersService, UserDto } from '../../services/users.service';

interface UsersState {
  status: 'loading' | 'success' | 'error';
  data: UserDto[];
  error: string | null;
}

@Component({
  selector: 'async-pipe-http-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="example">
      <h3>7) Async pipe + HttpClient</h3>
      <p class="hint">Async pipe with loading, retry, refresh, and debounced search.</p>

      <div class="stack">
        <label>
          Search users
          <input
            type="text"
            [value]="query()"
            (input)="updateQuery($event)"
            placeholder="Type to search"
          />
        </label>
        <div class="color-row">
          <button class="chip" type="button" (click)="refresh()">Refresh</button>
          <button class="chip" type="button" (click)="retryNow()">Retry</button>
        </div>
        <p *ngIf="retryCount()" class="hint">Retries: {{ retryCount() }}</p>
      </div>

      <ng-container *ngIf="usersState$ | async as state">
        <p *ngIf="state.status === 'loading'" class="hint">Loading...</p>
        <p *ngIf="state.status === 'error'" class="log">Error: {{ state.error }}</p>

        <ul *ngIf="state.status === 'success'" class="list">
          <li *ngFor="let user of state.data">
            <strong>{{ user.name }}</strong> — {{ user.email }}
          </li>
        </ul>
      </ng-container>
    </section>
  `,
})
export class AsyncPipeHttpExampleComponent {
  private readonly querySubject = new BehaviorSubject('');
  private readonly refreshSubject = new Subject<void>();
  private readonly retrySubject = new Subject<void>();

  readonly query = signal('');
  readonly retryCount = signal(0);

  private readonly query$ = this.querySubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith('')
  );

  private readonly request$ = merge(
    this.query$,
    this.refreshSubject.pipe(withLatestFrom(this.query$, (_value, query) => query)),
    this.retrySubject.pipe(withLatestFrom(this.query$, (_value, query) => query))
  );

  readonly usersState$ = this.request$.pipe(
    switchMap((query) => {
      this.retryCount.set(0);
      return this.usersService.getUsers().pipe(
        retry({
          count: 3,
          delay: (_error, retryCount) => {
            this.retryCount.set(retryCount);
            return timer(retryCount * 500);
          },
        }),
        map((data) =>
          query
            ? data.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
              )
            : data
        ),
        map((data): UsersState => ({ status: 'success', data, error: null })),
        startWith({ status: 'loading', data: [], error: null } as UsersState),
        catchError((err) =>
          of({
            status: 'error',
            data: [],
            error: err?.message ?? 'Request failed',
          } as UsersState)
        )
      );
    })
  );

  constructor(private readonly usersService: UsersService) {}

  updateQuery(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value?.trim() ?? '';
    this.query.set(value);
    this.querySubject.next(value);
  }

  refresh(): void {
    this.refreshSubject.next();
  }

  retryNow(): void {
    this.retrySubject.next();
  }
}
