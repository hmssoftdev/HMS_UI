export class CartItem {
  public id: number;
  public productId: number;
  public name: string;
  public price: number;
  public quantity: number = 0;
  public image: string;
  public description:string;
  public gstCompliance:number;
  public gstPrice:number;
  public isFull: boolean;
}
export class ShoppingCart {
  public id: number;
  public adminId: number;
  public userId: number;
  public orderitems: CartItem[] = new Array<CartItem>();
  public deliveryOptionId: number;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemTotal: number = 0;
  public gstTotal: number = 0;
  public itemCount: number = 0;
  public paymentMode: number;
  public updateFrom(src: ShoppingCart) {
      this.orderitems = src.orderitems;
      this.deliveryOptionId = src.deliveryOptionId;
      this.grossTotal = src.grossTotal;
      this.deliveryTotal = src.deliveryTotal;
      this.itemTotal = src.itemTotal;
      this.gstTotal = src.gstTotal;
      this.itemCount = src.itemCount;
    }
}

export class OrderStatus {
  public orderId: number;
  public status: number;
}