import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-router-playground',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './router-playground-page.html',
  styleUrl: './router-playground-page.css'
})
export class RouterPlaygroundPage {
  protected readonly activeComponent = signal('None');
  protected readonly currentUrl = signal('');

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set((event as NavigationEnd).urlAfterRedirects);
      });
  }

  goToList(): void {
    this.router.navigate(['/router']);
  }

  goToProduct(id: number): void {
    this.router.navigate(['/router/products', id]);
  }

  onActivate(component: unknown): void {
    const name = (component as { constructor?: { name?: string } } | null)?.constructor?.name;
    this.activeComponent.set(name ?? 'Unknown');
  }
}
