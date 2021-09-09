import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<number>(null);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: number){
    this.messageSource.next(message);
  }
}
