export interface OrderSummary{
    

    totalBill?:number,
    totalAmount?:number,
    deliveryOptionId?:number
}
export interface ordervalue{
    DiningBill?:number;
    homeDeliveryBill?:number;
    TakewayBill?:number;
    DiningAmount?:number;
    homeDeliveryAmount?:number;
    TakewayAmount?:number;
}