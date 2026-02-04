import { Routes } from '@angular/router';
import { DirectivesPage } from './pages/directives-page';
import { SignalsPage } from './pages/signals-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'directives' },
  { path: 'directives', component: DirectivesPage },
  { path: 'signals', component: SignalsPage },
  {
    path: 'router',
    loadChildren: () =>
      import('./pages/router/router.routes').then((m) => m.ROUTER_ROUTES),
  },
  // Alternative lazy-loading patterns (examples):
  // 1) Lazy-load a single standalone component:
  // {
  //   path: 'signals-lazy',
  //   loadComponent: () =>
  //     import('./pages/signals-page').then((m) => m.SignalsPage),
  // },
  // 2) Lazy-load a component and its children in one file:
  // {
  //   path: 'router-lazy-component',
  //   loadComponent: () =>
  //     import('./pages/router/router-playground-page').then(
  //       (m) => m.RouterPlaygroundPage
  //     ),
  // },
];
