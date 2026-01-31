import { Routes } from '@angular/router';
import { DirectivesPage } from './pages/directives-page';
import { SignalsPage } from './pages/signals-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'directives' },
  { path: 'directives', component: DirectivesPage },
  { path: 'signals', component: SignalsPage },
];
