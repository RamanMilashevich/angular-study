import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { catchError, finalize, of, retry, timer } from 'rxjs';
import { UsersService, UserDto } from '../../services/users.service';

@Component({
  selector: 'http-tasks-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="example">
      <h3>6) HttpClient + RxJS tasks</h3>
      <p class="hint">Task 1: loading + error UI. Task 2: retry with backoff.</p>

      <div class="color-row">
        <button class="chip" type="button" (click)="loadUsers()">Load users</button>
        <button class="chip" type="button" (click)="clear()">Clear</button>
      </div>

      <p *ngIf="loading()" class="hint">Loading...</p>
      <p *ngIf="error()" class="log">Error: {{ error() }}</p>
      <p *ngIf="retries()" class="hint">Retries: {{ retries() }}</p>

      <ul class="list">
        <li *ngFor="let user of users()">
          <strong>{{ user.name }}</strong> — {{ user.email }}
        </li>
      </ul>
    </section>
  `,
})
export class HttpTasksExampleComponent {
  readonly users = signal<UserDto[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly retries = signal(0);

  constructor(private readonly usersService: UsersService) {}

  loadUsers(): void {
    this.loading.set(true);
    this.error.set('');
    this.retries.set(0);

    this.usersService
      .getUsers()
      .pipe(
        retry({
          count: 3,
          delay: (_error, retryCount) => {
            this.retries.set(retryCount);
            return timer(retryCount * 500);
          },
        }),
        catchError((err) => {
          this.error.set(err?.message ?? 'Request failed');
          return of([] as UserDto[]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((users) => this.users.set(users));
  }

  clear(): void {
    this.users.set([]);
    this.error.set('');
    this.retries.set(0);
  }
}
