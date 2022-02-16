import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }
  
  getDeliveryOptStr(n:number){
    let strVal= '';
    switch(n){
      case 1:
        strVal = 'Dining';
        break;
      case 2:
        strVal = 'Home Delivery';
        break;                  
      case 3:
        strVal = 'Take Away'
    }
    return strVal;
  }

  getPaymentMode(n:number){
    let strVal= '-';
    switch(n){
      case 1:
        strVal = 'Cash';
        break;
      case 2:
        strVal = 'UPI';
        break;   
    }
    return strVal;
  }
  
}
