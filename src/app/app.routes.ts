import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const routes: Routes = [
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
        path: 'customer/:id',
        component: CustomerDetailComponent,
        title: 'Kunde'
    },
    {
        path: 'customer',
        component: CustomerDetailComponent,
        title: 'Kunde'
    }
];
