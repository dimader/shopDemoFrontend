/**
 * Kunde.
 */
export interface Customer {
    id: number;
    olversion: number;
    customernumber: string;
    name: string;
    forename: string;
    bdate: Date;
    salutation: string;
    createdat: Date;
    changedat: Date;
}
