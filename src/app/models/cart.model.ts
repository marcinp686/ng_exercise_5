export interface Cart {
  id:     number;
  userId: number;
  date:   Date;
  products: Array<{
      productId:  number;
      quantity:   number;
    }>
}