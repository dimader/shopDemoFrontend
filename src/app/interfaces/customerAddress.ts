import { Customer } from "./customer";

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

export interface CustomerAddress {
    customer: Customer;
    addresses: Address[];
}