/**
 * Position einer Bestellung (ShopOrderItem).
 */
export interface OrderItem {
    id: number;
    shoporder: number;
    product: number;
    price: number;
    createdat: Date;
}