import { Injectable } from '@angular/core';
import { Customer } from './interfaces/customer';
import { Address, CustomerAddress } from './interfaces/customerAddress';
import { Product } from './interfaces/product';

const fetchParams = {
  headers: {
    "Content-Type": "application/json",
  },
};

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'http://localhost:5000';
  customersUrl = this.baseUrl + '/customer/';
  customerAddressUrl = this.baseUrl + '/address/';
  productsUrl = this.baseUrl + '/product/';

  constructor() { }

  async getAllCustomers(): Promise<Customer[]> {
    const data = await fetch(this.customersUrl, fetchParams);
    return await data.json() ?? [];
  }

  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.productsUrl, fetchParams);
    return await data.json() ?? [];
  }

  async getCustomerById(id: number): Promise<CustomerAddress> {
    const data = await fetch(this.customersUrl + id, fetchParams);
    return await data.json() ?? {};
  }

  async getProductById(id: number): Promise<Product> {
    const data = await fetch(this.productsUrl + id, fetchParams);
    return await data.json() ?? {};
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    const data = await fetch(this.customersUrl + customer.id, {
      ...fetchParams,
      method: 'PATCH',
      body: JSON.stringify(customer)
    });
    return await data.json() ?? {};
  }

  async updateProduct(product: Product): Promise<Product> {
    const data = await fetch(this.productsUrl + product.id, {
      ...fetchParams,
      method: 'PATCH',
      body: JSON.stringify(product)
    });
    return await data.json() ?? {};
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    const data = await fetch(this.customersUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(customer)
    });
    return await data.json() ?? {};
  }

  async createProduct(product: Product): Promise<Product> {
    const data = await fetch(this.productsUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(product)
    });
    return await data.json() ?? {};
  }

  async deleteCustomer(customer: Customer): Promise<Response> {
    return await fetch(this.customersUrl + customer.id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }

  async deleteAddress(id: number): Promise<Response> {
    return await fetch(this.customerAddressUrl + id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }

  async deleteProduct(product: Product): Promise<Response> {
    return await fetch(this.productsUrl + product.id, {
      ...fetchParams,
      method: 'DELETE'
    });
  }

  async createAddress(address: Address): Promise<Address> {
    const data = await fetch(this.customerAddressUrl, {
      ...fetchParams,
      method: 'PUT',
      body: JSON.stringify(address)
    });
    return await data.json() ?? {};
  }
}
