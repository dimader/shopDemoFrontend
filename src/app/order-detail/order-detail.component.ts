import { Component, inject } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { ShopService } from '../shop.service';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Order } from '../interfaces/order';
import { OrderItem } from '../interfaces/orderItem';
import { MatIconModule } from '@angular/material/icon';
import { OrderItemAddDialogComponent } from '../order-item-add-dialog/order-item-add-dialog.component';

/**
 * Bestellung Detail Seite.
 */
@Component({
  selector: 'app-order-detail',
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
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order: Order | undefined = undefined;
  customersList: Customer[] = [];
  selectedCustomer: number = 0;
  orderitemsList: OrderItem[] = [];

  shopService: ShopService = inject(ShopService);
  route: ActivatedRoute = inject(ActivatedRoute);
  orderForm: FormGroup;
  displayedColumns: string[] = ['product', 'price', 'action'];

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router: Router) {

    this.orderForm = this.formBuilder.group({
      ordernumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.load();
  }
  
  /**
   * Laden der Daten für die Maske.
   * @param id ID
   */
  load() {
    const id = this.route.snapshot.params['id'];
    this.shopService.getAllCustomers().then(customers => {
      this.customersList = customers;

      if (id) {
        this.loadOrder(id);
        this.loadOrderItems(id);
      }
    })
  }

  /**
   * Lädt die Bestellung.
   * @param id Order ID.
   */
  loadOrder(id: number): void {
    this.shopService.getOrderById(id).then(data => {
      this.order = data
      this.selectedCustomer = data.customer;
      
      this.orderForm.patchValue(this.order);
    });
  }

  /**
   * Lädt die Positionen (ShopOrderItems).
   * @param id Order ID.
   */
  loadOrderItems(id: number): void {
    this.shopService.getOrderItemsByOrderId(id).then(data => {
      this.orderitemsList = data;
    });
  }

  /**
   * Änderungen Speichern.
   */
  saveOrder() {
    if (this.orderForm.valid) {
      const newData = { ...this.order, ...this.orderForm.value, customer: this.selectedCustomer};
      if (this.order?.id) {
        this.shopService.updateOrder(newData as Order)
          .then(order => {
            this.order = order;
          });
      } else {
        this.shopService.createOrder(newData as Order)
          .then(order => {
            this.loadOrder(order.id);
          });
      }
    }
  }

  /**
   * Aktuellen Eintrag löschen.
   */
  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {confirm: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.shopService.deleteOrder(this.order as Order).then(result => {
          this.goBack();
        });
      }
    }); 
  }

  /**
   * Zurück navigieren.
   */
  goBack() {
    this.router.navigate(['/orders']);
  }

  /**
   * Öffnet Erfassungsdialog für eine neue Position.
   */
  addPosition() {
    const dialogRef = this.dialog.open(OrderItemAddDialogComponent, {
      data: { shoporder: this.order!.id },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadOrderItems(this.order!.id);
    }); 
  }

  /**
   * Löscht den Eintrag mit der übergebenen ID.
   * @param id Position (ShopOrderItem) ID.
   */
  deletePosition(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {confirm: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.shopService.deleteShopOrderItem(id).then(data => {

          const tabData = this.orderitemsList.filter(each => each.id != id);
          this.orderitemsList = [...tabData];
        });
      }
    }); 
  }
}
