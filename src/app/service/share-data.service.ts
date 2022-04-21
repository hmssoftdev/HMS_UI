import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dialogSource = new BehaviorSubject<boolean>(false)
  private messageSource = new BehaviorSubject<number>(0);
  private dataObject = new Subject<any>();
  public defaultId = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  currentObject = this.dataObject.asObservable();
  currentId = this.defaultId.asObservable();
  currentDiallog = this.dialogSource.asObservable();
  constructor() { }
  changeMessage(message: number){
    this.messageSource.next(message);
  }
  sendObject(object: any) {
    this.dataObject.next(object);
  }

  sendId(id: number) {
    this.defaultId.next(id);
  }

  changeDialog(dialog: boolean){
    this.dialogSource.next(dialog);
  }
}
