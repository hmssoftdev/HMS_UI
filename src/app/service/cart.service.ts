import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
import { Dish } from '../models/dish';
import { ShoppingCart, CartItem } from '../models/shopping-cart'; 
import { StorageService } from './storage.service';
const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderUrl = `${ApiConfig.URL}${ApiConfig.ORDER}`;
  orderList: Array<any>;
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
  console.log(product);

  const cart = this.retrieve();
  const prodId = product.id ? product.id : product.productId;
  const qStatus = product.isFullIsHalf ? product.isFullIsHalf : product.isFullIsHalf;
  let item = cart.items.find((p) => p.productId == prodId && p.isFullIsHalf === qStatus);
  cart.itemCount = quantity === 1 ? cart.itemCount+quantity : cart.itemCount-1;
  if (item === undefined) {
    item = new CartItem();
    item.productId = product.id;
    item.name = product.name;
    item.price = product.isFullIsHalf ? product.fullPrice : product.halfPrice ;
    item.description = product.description;
    item.image= product.imageUrl ? product.imageUrl : './assets/img/dishes/img-menu-placeholder.jpg';
    item.gstCompliance = gstCompliance || 0;
    item.gstPrice = item.price * item.gstCompliance / 100;
    item.isFullIsHalf = product.isFullIsHalf;
    cart.items.push(item);
  }

  item.quantity += quantity;
  cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
  if (cart.items.length === 0) {
    cart.deliveryOptionId = undefined;
  }

  this.calculateCart(cart);
  this.save(cart);
  this.dispatch(cart);
}

public empty(): void {
  const newCart = new ShoppingCart();
 this.save(newCart);
 this.dispatch(newCart);
}

private calculateCart(cart: ShoppingCart): void {
  cart.itemsTotal = cart.items
                        .map((item) => item.quantity * item.price)
                        .reduce((previous, current) => previous + current, 0);
  // cart.deliveryTotal = cart.deliveryOptionId ?
  //                       this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
  //                       0;
  cart.gstTotal = cart.items
  .map((item) => item.quantity * item.gstPrice)
  .reduce((previous, current) => previous + current, 0);
  cart.grossTotal = cart.itemsTotal + cart.gstTotal;
}

private retrieve(): ShoppingCart {
  const cart = new ShoppingCart();
  const storedCart = this.storage.getItem(CART_KEY);
  if (storedCart) {
    cart.updateFrom(JSON.parse(storedCart));
  }

  return cart;
}

private save(cart: ShoppingCart): void {
  this.storage.setItem(CART_KEY, JSON.stringify(cart));
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

  
postOrder(order): Observable<any> {

  return this.http.post<Dish>(this.orderUrl, order).pipe(
    map(x => {
      this.orderList.push(x);
      return order;
    }),
    catchError(this.handleError('', order))
  );
}

handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    //  this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}


}
