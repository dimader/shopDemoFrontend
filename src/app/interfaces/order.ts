/**
 * Bestellung.
 */
export interface Order {
    id: number;
    ordernumber: string;
    customer: number;
    createdat: Date;
    changedat: Date;
}