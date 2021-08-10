import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiConfig } from '../constant/api';
import { Registration } from '../models/registration';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${ApiConfig.URL}${ApiConfig.REGISTERED}`;
  public register: Registration;
  storage: Storage;
  public uLoggedInSubject$ = new BehaviorSubject(null);
  constructor(private http: HttpClient, private storageService: StorageService) { 
    this.storage = this.storageService.get();
  }
  
  registerUser(userData:Registration){
    return this.http.post<Registration>(this.url, userData)
  }
  loginUser(user){
    return this.http.post(`${this.url}/authenticate`, user)
  }
  loggedIn(){
    return this.uLoggedInSubject$.getValue();
  }
  userData(){
    return this.storage.getItem('userData')
  }
  logoutUser(){
    this.storage.removeItem('HMSToken');
    this.storage.removeItem('userData');
  }
}
