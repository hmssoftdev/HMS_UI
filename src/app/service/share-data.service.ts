import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<number>(0);
  private dataObject = new Subject<any>();
  currentMessage = this.messageSource.asObservable();
  currentObject = this.dataObject.asObservable();
  constructor() { }
  changeMessage(message: number){
    this.messageSource.next(message);
  }
  sendObject(object: any) {
    this.dataObject.next(object);
  }
}
