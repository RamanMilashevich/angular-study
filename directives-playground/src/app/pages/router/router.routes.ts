import { Routes } from '@angular/router';
import { RouterPlaygroundPage } from './router-playground-page';
import { ProductsListPage } from './products-list-page';
import { ProductDetailPage } from './product-detail-page';

export const ROUTER_ROUTES: Routes = [
  {
    path: '',
    component: RouterPlaygroundPage,
    children: [
      { path: '', component: ProductsListPage },
      { path: 'products/:id', component: ProductDetailPage },
    ],
  },
];
