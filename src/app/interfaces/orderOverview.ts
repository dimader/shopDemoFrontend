import { Order } from "./order";

/**
 * Bestellung mit zusätzlichen Daten für die Übersicht.
 */
export interface OrderOverview {
    order: Order;
    customername: string;
}