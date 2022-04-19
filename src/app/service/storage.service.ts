 
import { Injectable } from "@angular/core";
// import "rxjs/add/operator/share"; 

export abstract class StorageService {
  public abstract get(): Storage;
}

// tslint:disable-next-line:max-classes-per-file

@Injectable() 
export class SessionStorageService extends StorageService {
  public get(): Storage {
    return sessionStorage;
  }
}
