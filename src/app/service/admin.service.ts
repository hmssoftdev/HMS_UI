import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
import { Client, CLientCategory } from '../models/client';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = `${ApiConfig.URL}${ApiConfig.CLIENT}`;
  categoryUrl = `${ApiConfig.URL}${ApiConfig.CLIENTCATEGORY}`;
  client: Admin | undefined;
  clientList: Admin[] = [];
  userData = JSON.parse(localStorage.getItem('HMSUserData'));
  constructor(private httpClient: HttpClient) { }
  // Add Client
  AddClient(client): Observable<Admin> {
    console.log(this.url);
    return this.httpClient.post<Admin>(this.url, client).pipe(
      map(x => {
        this.clientList.push(x);
        return client;
      }),
      catchError(this.handleError('', client))
    );
  }
  updateSubscription(client: Admin): Observable<Admin> {
    return this.httpClient.put<Admin>(`${this.url}/updateSubscription`, client).pipe(
      map(x => {
        return client;
      }),
      catchError(this.handleError('', client))
    );
  }
  // updating exisiting client's data
  updateCLient(client): Observable<Admin> {
    return this.httpClient.put<Admin>(`${this.url}`, client).pipe(
      map(x => {
        // tslint:disable-next-line:prefer-const
        let index = this.clientList.findIndex(i => i.id === x.id)
        this.clientList[index] = x;
        return client;
      }),
      catchError(this.handleError('', client))
    );
  }

  deleteAdminData(id: number): Observable<Admin> {
    return this.httpClient.delete<Admin>(`${this.url}?id=${id}`).pipe(
      catchError(this.handleError('', this.client)))
  }

  // Get client list
  getClientList(): Observable<Admin[]> {
    console.log(this.userData);
    //return this.httpClient.get<Admin[]>(`${this.url}/Get/${this.userData.adminId}`).pipe(
    return this.httpClient.get<Admin[]>(`${ApiConfig.URL}User/GetAllAdmin`).pipe(
        map(resp => {
          //this.clientList = x;
          return resp;
        })
      );
  }
  getAdmin(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(`${this.url}/Get/${this.userData.adminId}`).pipe(
      map(x => {
        this.clientList = x;
        return this.clientList;
      })
    );
  }

  getClientCategory(): Observable<CLientCategory[]> {
    return this.httpClient.get<CLientCategory[]>(`${this.categoryUrl}`).pipe(
      map(x => {
        return x;
      })
    );
  }
  //
  getAdminById(id:number){
    return this.httpClient.get(`${this.url}/GetByUserId/${id}`).pipe(
      map(resp => resp),
      catchError(this.handleError('get Admin', id))
    )
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
