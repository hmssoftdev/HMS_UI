export interface Historydata {
    id?: number;
    adminId?: number;
    deliveryOptionId?: number;
    deliveryTotal?: number;
    grossTotal?: number;
    itemCount?: number;
    itemTotal?: number;
    paymentMode?: number;
    userId?: number;
    userMobileNumber?: string;
    userName?: string;
    status?: string;
    invoiceNumber?:number;
    visitCount?:number;
    createdOn?:Date;
}
export interface FoodItem{
     name?:string;
     count?:number;
   total?:number;

}