import { Component, inject } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { ShopService } from '../shop.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../interfaces/customerAddress';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { formatDate } from '@angular/common';
import { AddressEditDialogComponent } from '../address-edit-dialog/address-edit-dialog.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatTableModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {

  customer: Customer | undefined = undefined;
  addressList = new MatTableDataSource<Address>([]);

  shopService: ShopService = inject(ShopService);
  route: ActivatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['street', 'housenumber', 'citycode', 'city', 'addressType', 'action'];

  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router: Router) {

    this.customerForm = this.formBuilder.group({
      forename: ['', Validators.required],
      name: ['', Validators.required],
      salutation: ['', Validators.required],
      customernumber: ['', Validators.required],
      bdate: [this.customer ? formatDate(this.customer!.bdate, 'dd-MM-yyyy', 'de') : '', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadCustomer(id);
    }
  }

  loadCustomer(id: number): void {
    this.shopService.getCustomerById(id).then(data => {
      this.customer = data.customer;
      this.addressList.data = data.addresses;

      this.customerForm.patchValue(this.customer);
    });
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      if (this.customer?.id) {
        // Save
        // Daten der Form mit den gelandenen Customer Daten zusammenführen
        const newData = { ...this.customer, ...this.customerForm.value};
        this.shopService.updateCustomer(newData as Customer).then(customer => {
          this.customer = customer;
        });
      } else {
        this.shopService.createCustomer(this.customerForm.value as Customer)
        .then(customer => {
          this.loadCustomer(customer.id);
        });
      }
    }
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {confirm: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.shopService.deleteCustomer(this.customer as Customer).then(result => {
          this.goBack();
        });
      }
    }); 
  }

  deleteAddress(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {confirm: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.shopService.deleteAddress(id).then(data => {

          const tabData = this.addressList.data.filter(each => each.id != id);
          this.addressList.data = [...tabData];
        });
      }
    }); 
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addAddress() {
    const dialogRef = this.dialog.open(AddressEditDialogComponent, {
      data: { customerid: this.customer!.id },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadCustomer(this.customer!.id);
    }); 
  }

  /**
   * Formatiert den Adress-Type.
   * @param at Adress-Type.
   * @returns Formatierter String.
   */
  formatAddressType(at: string): string {
    return at === 'l' ? 'Lieferadr.' : at === 'r' ? 'Rechnungsadr.' : 'undefined';
  }
}
