import { Component, inject, Inject } from '@angular/core';
import { ShopService } from '../shop.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Product } from '../interfaces/product';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-order-item-add-dialog',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './order-item-add-dialog.component.html',
  styleUrl: './order-item-add-dialog.component.css'
})
export class OrderItemAddDialogComponent {
  shopService: ShopService = inject(ShopService);
  productList: Product[] = [];
  positionForm: FormGroup;
  selectedProduct: number = 0;
  // Zahlenformat für Preise
  format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'});

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrderItemAddDialogComponent>,) {

    this.positionForm = this.formBuilder.group({
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.shopService.getAllProducts().then(data => {
      this.productList = data;
    });
  }

  onSubmit() {
    if (this.positionForm.valid) {
      const newData = {...this.positionForm.value, product: this.selectedProduct, shoporder: this.data.shoporder };
      this.shopService.createShopOrderItem(newData)
        .then(result => {
          this.dialogRef.close(true);
        });
    }
  }

   /**
   * Formatiert einen Preis.
   * @param price Preis.
   * @returns String.
   */
   formatPrice(price: number): string {
    return this.format.format(price);
  }

  refreshPrice() {
    const selProduct = this.productList.find(p => p.id === this.selectedProduct)
    if (selProduct) {
      this.positionForm.controls['price'].setValue(selProduct.price);
    }
  }
}
