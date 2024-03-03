import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'

import { Customer } from '../interfaces/customer';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customersList: Customer[] = [];
  shopService: ShopService = inject(ShopService);
  displayedColumns: string[] = ['id', 'customernumber', 'salutation', 'forename', 'name', 'bdate', 'createdat'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.shopService.getAllCustomers().then(customers => {
      this.customersList = customers;
    })
  }

  openDetails(row: Customer) {
    this.router.navigate(['/customer/' + row.id]);
  }

  createCustomer() {
    this.router.navigate(['/customer/']);
  }
}
