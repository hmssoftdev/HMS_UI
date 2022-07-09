import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { resourceUsage } from 'process';
import { Observable, Observer, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
import { Dish } from '../models/dish';
import { OrderItem, OrderList } from '../models/orderList';
import { ShoppingCart, CartItem, OrderStatus } from '../models/shopping-cart'; 
import { StorageService } from './storage.service';
const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderUrl = `${ApiConfig.URL}${ApiConfig.ORDER}`;
  orderList: OrderList[] = [];
  // orderList: Array<any>;
  userData = JSON.parse(sessionStorage.getItem('HMSUserData'));

  tableSubject = new Subject<Array<string>>();
  
  tableObservable = this.tableSubject.subscribe();

  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  constructor(
    private storageService: StorageService,
    private http: HttpClient) { 
    this.storage = this.storageService.get();
  this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
    this.subscribers.push(observer);
    observer.next(this.retrieve());
    return () => {
      this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    };
  });
}
public get(): Observable<ShoppingCart> {
  return this.subscriptionObservable;
}

public addItem(product: any, quantity: number, gstCompliance?:number): void {
  debugger
  const cart = this.retrieve();
  const prodId = product.id && !product.productId ? product.id : product.productId;
  const qStatus = product.isFull;
  //let item = cart.orderItems.find((p) => p.productId == prodId && p.isFull === qStatus && p.kotPrinted == false);
  let item = cart.orderItems.find((p) => p.productId == prodId && p.isFull === qStatus);

  cart.itemCount = quantity === 1 ? cart.itemCount+quantity : cart.itemCount-1;
  
  if (item === undefined ) {
    item = new CartItem();
    item.productId = product.id;
    item.name = product.name;
    item.price = product.isFull ? product.fullPrice : product.halfPrice ;
    item.description = product.description;
    item.image= product.imageUrl ? product.imageUrl : './assets/img/dishes/img-menu-placeholder.jpg';
    item.gstCompliance = gstCompliance || 0;
    item.gstPrice = item.price * item.gstCompliance / 100;
    item.isFull = product.isFull;
    item.kotPrinted = false;
    cart.orderItems.push(item);
  }

  item.quantity += quantity;
  cart.orderItems = cart.orderItems.filter((cartItem) => cartItem.quantity > 0);
  if (cart.orderItems.length === 0) {
    cart.deliveryOptionId = undefined;
  }
  this.calculateCart(cart);
  this.save(cart);
  this.dispatch(cart);
}
public addOrderId(id){
  debugger
  const cart = this.retrieve();
  cart.id = id;
  this.save(cart);
}
public empty(): void {
  const newCart = new ShoppingCart();
 this.save(newCart);
 this.dispatch(newCart);
}

private calculateCart(cart: ShoppingCart): void {
  cart.itemTotal = cart.orderItems
                        .map((item) => item.quantity * item.price)
                        .reduce((previous, current) => previous + current, 0);
  // cart.deliveryTotal = cart.deliveryOptionId ?
  //                       this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
  //                       0;
  cart.gstTotal = cart.orderItems
  .map((item) => item.quantity * item.gstPrice)
  .reduce((previous, current) => previous + current, 0);
  cart.discountInRupees = (cart.itemTotal * cart.discountInPercent | 0) / 100; 
  cart.grossTotal = (cart.itemTotal - cart.discountInRupees + (cart.additionalAmount  | 0)) + cart.gstTotal ;
}
public calcDiscountRupees(cart:ShoppingCart){
  cart.discountInRupees = (cart.itemTotal * cart.discountInPercent) / 100 | 0; 
  cart.grossTotal = (cart.itemTotal - cart.discountInRupees + (cart.additionalAmount | 0)) + cart.gstTotal ;
  this.save(cart)
}
public calcDiscountRupeess(cart:ShoppingCart){
  cart.discountInRupees = ((cart.itemTotal - cart.discountInPercent) / 100 | 0)+cart.discountInrupes | 0; 
  cart.grossTotal = (cart.itemTotal - (cart.discountInRupees + (cart.additionalAmount | 0))) + cart.gstTotal ;
  this.save(cart)
}
public calcAdditionalAmount(cart:ShoppingCart){ 
  cart.grossTotal = (cart.itemTotal - cart.discountInRupees+ (cart.additionalAmount | 0)) + cart.gstTotal ;
  this.save(cart)
}
private retrieve(): ShoppingCart {
  const cart = new ShoppingCart();
  const storedCart = this.storage.getItem(CART_KEY);
  if (storedCart) {
    cart.updateFrom(JSON.parse(storedCart));
  }
  return cart;
}

public save(cart: ShoppingCart): void {
  //cart.userId = this.userData.id;
  this.storage.setItem(CART_KEY, JSON.stringify(cart));
}
public addUser(user){
  const cart = this.retrieve();
  cart.userId = user.id;
  this.save(cart);
}
private dispatch(cart: ShoppingCart): void {
  this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
}

public addTable(table){
  const cart = this.retrieve();
  cart.tableIds = [];
  if(table.isBooked){
  cart.tableIds.push(table.id)
  } else {
    cart.tableIds = [];
  }
 // cart.tableId = table.id;
  this.save(cart);
}
public addDeliveryMode(deliveryMode:string){
  const cart = this.retrieve();
  cart.deliveryMode = deliveryMode;
  let dMid = 1;
  switch(deliveryMode){
    case 'Dining':
      dMid = 1;
      break;
    case 'Home Delivery':
      dMid = 2;
      cart.tableIds = [];
      break;
    case 'Take Away':
      dMid = 3;
      cart.tableIds = [];
      break;
  }
  cart.deliveryOptionId = dMid;
  this.save(cart)
}

getOrder(): Observable<OrderList[]> {
  return this.http.get<OrderList[]>(`${this.orderUrl}/Get/${this.userData.adminId}`).pipe(
    map(x => {
     this.orderList = x;
     return this.orderList;
    })
  )
}
  
getOrderStatus(orderId: number): Observable<OrderStatus[]> {
  return this.http.get<OrderStatus[]>(`${this.orderUrl}/Get/status/${orderId}`).pipe(
    map(x => {
      return x;
    }));
}

getOrderItem(orderId: number): Observable<OrderItem[]> {
 return this.http.get<OrderItem[]>(`${this.orderUrl}/Get/orderitem/${orderId}`).pipe(
   map(x => {
     return x;
   })
 ); 
}
postOrder(order: ShoppingCart): Observable<ShoppingCart> {
  return this.http.post<ShoppingCart>(this.orderUrl, order).pipe(
    map(x => {
      return x;
    }),
    catchError(this.handleError('', order))
  );
}
AddpostOrder(order: ShoppingCart): Observable<ShoppingCart> {
  return this.http.post<ShoppingCart>(`${this.orderUrl}/Addorder`,order).pipe(
    map(x => {
      return x;
    }),
    catchError(this.handleError('', order))
  );
}
PutOrder(order: ShoppingCart): Observable<ShoppingCart> {
  return this.http.put<ShoppingCart>(`${this.orderUrl}`,order).pipe(
    map(x => {
      return x;
    }),
    catchError(this.handleError('', order))
  );
}



postOrderStatus(status): Observable<OrderStatus> {
  return this.http.post<OrderStatus>(`${this.orderUrl}/Post/{AddStatus}`, status).pipe(
    map( res => {
      return res;
    })
  )
}
paymodeModeUpdate(orderData){
  return this.http.put(`${this.orderUrl}/PaymentModeUpdate`,orderData).pipe(
     map(resp => {
    return orderData;
  }),
  catchError(this.handleError('', orderData))
);;
}
handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    //  this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

tableOperation(stringArray : Array<string>) {
  this.tableSubject.next(stringArray);
}

}
