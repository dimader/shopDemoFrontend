import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

/**
 * Routen der Anwendung.
 */
export const routes: Routes = [
    // Übersichtseiten
    {
        path: '',
        component: CustomersComponent,
        title: 'Kunden'
    },
    {
        path: 'products',
        component: ProductsComponent,
        title: 'Produkte'
    },
    {
        path: 'orders',
        component: OrdersComponent,
        title: 'Bestellungen'
    },
    // Detail Seiten
    {
        path: 'customer/:id',
        component: CustomerDetailComponent,
        title: 'Kunde'
    },
    {
        path: 'customer',
        component: CustomerDetailComponent,
        title: 'Neuer Kunde'
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
        title: 'Kunde'
    },
    {
        path: 'product',
        component: ProductDetailComponent,
        title: 'Neuer Kunde'
    },
    {
        path: 'order/:id',
        component: OrderDetailComponent,
        title: 'Bestellung'
    },
    {
        path: 'order',
        component: OrderDetailComponent,
        title: 'Neue Bestellung'
    }
];
