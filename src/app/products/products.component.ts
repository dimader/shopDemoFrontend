import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'

import { ShopService } from '../shop.service';
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  productsList: Product[] = [];
  shopService: ShopService = inject(ShopService);
  displayedColumns: string[] = ['id', 'productnumber', 'price', 'description', 'createdat'];

  // Zahlenformat für Preise
  format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.shopService.getAllProducts().then(products => {
      this.productsList = products;
    })
  }

  openDetails(row: Product) {
    this.router.navigate(['/product/' + row.id]);
  }

  createProduct() {
    this.router.navigate(['/product/']);
  }

  /**
   * Formatiert einen Preis.
   * @param price Preis.
   * @returns String.
   */
  formatPrice(price: number): string {
    return this.format.format(price);
  }
}
