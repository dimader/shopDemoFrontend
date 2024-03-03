import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ShopService } from '../shop.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-address-edit-dialog',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
  ],
  templateUrl: './address-edit-dialog.component.html',
  styleUrl: './address-edit-dialog.component.css'
})
export class AddressEditDialogComponent {
  shopService: ShopService = inject(ShopService);
  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddressEditDialogComponent>,) {

    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      housenumber: ['', Validators.required],
      citycode: ['', Validators.required],
      city: ['', Validators.required],
      addressType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addressForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData = {...this.addressForm.value, customer: this.data.customerid };
      this.shopService.createAddress(addressData)
      .then(result => {
        this.dialogRef.close(true);
      });
    }
  }
}
