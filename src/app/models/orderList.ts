export interface OrderList {
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
}

export interface OrderItem {
    id?: number;
    quantity?: number;
    productId?: number;
    price?: number;
    gstCompliance?: number;
    gstPrice?: number;
    orderID?: number;
    dishName?: string;

}