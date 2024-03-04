import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'

import { ShopService } from '../shop.service';
import { OrderOverview } from '../interfaces/orderOverview';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  ordersList: OrderOverview[] = [];
  shopService: ShopService = inject(ShopService);
  displayedColumns: string[] = ['id', 'ordernumber', 'customername', 'createdat'];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.shopService.getAllOrders().then(orders => {
      this.ordersList = orders;
    })
  }

  openDetails(row: OrderOverview) {
    this.router.navigate(['/order/' + row.order.id]);
  }

  createOrder() {
    this.router.navigate(['/order/']);
  }
}
