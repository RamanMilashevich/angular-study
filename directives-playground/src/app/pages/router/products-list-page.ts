import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-list-page.html',
  styleUrl: './products-list-page.css'
})
export class ProductsListPage {
  protected readonly products: Product[] = [
    { id: 101, name: 'Wireless Mouse', price: 29 },
    { id: 102, name: 'Mechanical Keyboard', price: 119 },
    { id: 103, name: 'USB-C Hub', price: 49 },
  ];

  constructor(private readonly router: Router) {}

  goToFirst(): void {
    this.router.navigate(['/router/products', this.products[0].id]);
  }
}
