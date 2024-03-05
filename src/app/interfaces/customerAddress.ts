import { Customer } from "./customer";

/**
 * Kunden-Adresse.
 */
export interface Address {
    id: number;
    olVersion: number;
    street: string;
    housenumber: string;
    citycode: string;
    city: string;
    addressType: string;
    customer: number;
    createdat: Date;
    changedat: Date;
}

/**
 * Kunde und alle seine Adressen.
 */
export interface CustomerAddress {
    customer: Customer;
    addresses: Address[];
}