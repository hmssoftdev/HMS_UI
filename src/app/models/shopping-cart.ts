export class CartItem {
    public userId: number;
    public adminId: number
    public productId: number;
    public name: string;
    public price: number;
    public quantity: number = 0;
    public image: string;
    public description:string;
    public gstCompliance:number;
    public gstPrice:number;
    public isFullIsHalf: boolean;
  }
export class ShoppingCart {
    public items: CartItem[] = new Array<CartItem>();
    public deliveryOptionId: string;
    public grossTotal: number = 0;
    public deliveryTotal: number = 0;
    public itemsTotal: number = 0;
    public gstTotal: number = 0;
    public itemCount: number = 0;
    public updateFrom(src: ShoppingCart) {
        this.items = src.items;
        this.deliveryOptionId = src.deliveryOptionId;
        this.grossTotal = src.grossTotal;
        this.deliveryTotal = src.deliveryTotal;
        this.itemsTotal = src.itemsTotal;
        this.gstTotal = src.gstTotal;
        this.itemCount = src.itemCount;
      }
}