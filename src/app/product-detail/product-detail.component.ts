import { Component, inject } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: Product | undefined = undefined;
  shopService: ShopService = inject(ShopService);
  route: ActivatedRoute = inject(ActivatedRoute);

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router: Router) {

    this.productForm = this.formBuilder.group({
      productnumber: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.shopService.getProductById(id).then(data => {
      this.product = data;
      
      this.productForm.patchValue(this.product);
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.product?.id) {
        const newData = { ...this.product, ...this.productForm.value};
        this.shopService.updateProduct(newData as Product).then(product => {
          this.product = product;
        });
      } else {
        this.shopService.createProduct(this.productForm.value as Product)
        .then(product => {
          this.loadProduct(product.id);
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
        this.shopService.deleteProduct(this.product as Product).then(result => {
          this.goBack();
        });
      }
    }); 
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
