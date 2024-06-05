export interface Order {
  orderId: number;
  customerId: number;
  cartId: number;
  orderDate: Date;
  orderStatusId: number;
  deliveryPoint: string;
}
