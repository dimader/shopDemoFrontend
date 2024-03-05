import { Injectable } from '@angular/core';
import { Customer } from './interfaces/customer';
import { Address, CustomerAddress } from './interfaces/customerAddress';
import { Product } from './interfaces/product';
import { OrderOverview } from './interfaces/orderOverview';
import { Order } from './interfaces/order';
import { OrderItem } from './interfaces/orderItem';

/** Generelle Parameter für alle fetch-Anfragen. */
const fetchParams = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Service für alle ShopDemo Endpunkte.
 */
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'http://localhost:5000';
  customersUrl = this.baseUrl + '/customer/';
  customerAddressUrl = this.baseUrl + '/address/';
  productsUrl = this.baseUrl + '/product/';
  ordersUrl = this.baseUrl + '/order/';
  orderItemsUrl = this.baseUrl + '/orderitem/';
  orderItemsByOrderUrl = this.orderItemsUrl + 'by-order/';

  constructor() { }

  /*
   * Getter Services
   */

  /** Service: Alle Kunden. */
  async getAllCustomers(): Promise<Customer[]> {
    const data = await fetch(this.customersUrl, fetchParams);
    return await data.json() ?? [];
  }
  /** Service: Alle Produkte. */
  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.productsUrl, fetchParams);
    return await data.json() ?? [];
  }
  /** Service: Alle Bestellungen. */
  async getAllOrders(): Promise<OrderOverview[]> {
    const data = await fetch(this.ordersUrl, fetchParams);
    return await data.json() ?? [];
  }
  /** Service: Kunde für ID. */
  async getCustomerById(id: number): Promise<CustomerAddress> {
    const data = await fetch(this.customersUrl + id, fetchParams);
    return await data.json() ?? {};
  }
  /** Service: Produkt für ID. */
  async getProductById(id: number): Promise<Product> {
    const data = await fetch(this.productsUrl + id, fetchParams);
    return await data.json() ?? {};
  }
  /** Service: Bestellung für ID. */
  async getOrderById(id: number): Promise<Order> {
    const data = await fetch(this.ordersUrl + id, fetchParams);
    return await data.json() ?? {};
  }
  /** Service: Alle Positionen zu einer Bestellung ID.  */
  async getOrderItemsByOrderId(id: number): Promise<OrderItem[]> {
    const data = await fetch(this.orderItemsByOrderUrl + id, fetchParams);
    return await data.json() ?? [];
  }

  /*
   * Update Services.
   */

  /** Service: Aktualisiere Kunde. */
  async updateCustomer(customer: Customer): Promise<Customer> {
    const data = await fetch(this.customersUrl + customer.id, {
      ...fetchParams,
      method: 'PATCH',
      body: JSON.stringify(customer)
    });
    return await data.json() ?? {};
  }
  /** Service: Aktualisiere Produkt. */
  async updateProduct(product: Product): Promise<Product> {
    const data = await fetch(this.productsUrl + product.id, {
      ...fetchParams,
      method: 'PATCH',
      body: JSON.stringify(product)
    });
    return await data.json() ?? {};
  }
  /** Service: Aktualisiere Bestellung. */
  async updateOrder(order: Order): Promise<Order> {
    const data = await fetch(this.ordersUrl + order.id, {
      ...fetchParams,
      method: 'PATCH',
      body: JSON.stringify(order)
    });
    return await data.json() ?? {};
  }

  /*
   * Create Services.
   */
  /** Service: Lege einen neuen Kunden an. */
  async createCustomer(customer: Customer): Promise<Customer> {
    const data = await fetch(this.customersUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(customer)
    });
    return await data.json() ?? {};
  }
  /** Service: Lege ein neues Produkt an. */
  async createProduct(product: Product): Promise<Product> {
    const data = await fetch(this.productsUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(product)
    });
    return await data.json() ?? {};
  }
  /** Service: Lege eine neue Kunden-Adresse an. */
  async createAddress(address: Address): Promise<Address> {
    const data = await fetch(this.customerAddressUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(address)
    });
    return await data.json() ?? {};
  }
  /** Service: Lege eine neue Bestellung an. */
  async createOrder(order: Order): Promise<Order> {
    const data = await fetch(this.ordersUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(order)
    });
    return await data.json() ?? {};
  }
  /** Service: Lege eine neue Position in einer Bestellung an. */
  async createShopOrderItem(item: OrderItem): Promise<OrderItem> {
    const data = await fetch(this.orderItemsUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(item)
    });
    return await data.json() ?? {};
  }

  /*
   * Delete Services.
   */
  /** Service: Lösche Kunde. */
  async deleteCustomer(customer: Customer): Promise<Response> {
    return await fetch(this.customersUrl + customer.id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }
  /** Service: Lösche Kunden-Adresse. */
  async deleteAddress(id: number): Promise<Response> {
    return await fetch(this.customerAddressUrl + id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }
  /** Service: Lösche Produkt. */
  async deleteProduct(product: Product): Promise<Response> {
    return await fetch(this.productsUrl + product.id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }
  /** Service: Lösche Bestellung. */
  async deleteOrder(order: Order): Promise<Response> {
    return await fetch(this.ordersUrl + order.id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }
  /** Service: Lösche Position. */
  async deleteShopOrderItem(id: number): Promise<Response> {
    return await fetch(this.orderItemsUrl + id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }
}
