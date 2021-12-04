import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
import { ShoppingCart } from '../models/shopping-cart';
import { Hotel } from '../models/tabelConfiguration.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  url = `${ApiConfig.URL}${ApiConfig.HOTEL}`;
  userData = JSON.parse(localStorage.getItem('HMSUserData'));
  table: Hotel;
  tableList: Hotel[] = [];
  constructor(public http: HttpClient) { }

  getTableData(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.url}/Get/${this.userData.adminId}`).pipe(
      map( x => {
        this.tableList = x;
        return this.tableList;
      })
    )
  }

  addTable(table): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.url}` ,table).pipe(
      map(resp => { 
        return resp;
      }),
      catchError(this.handleError('', table))
    );
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  updateTable(table): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.url}`, table).pipe(
      map(resp => {
        return resp;
      }),
      catchError(this.handleError('', table))
    );
  }

  updateSeat(table): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.url}/updateSeat` ,table).pipe(
      map(resp => { 
        return resp;
      }),
      catchError(this.handleError('', table))
    );
  }
  deleteData(id: number): Observable<Hotel> {
    return this.http.delete<Hotel>(`${this.url}?id=${id}`).pipe(
      catchError(this.handleError('', this.table)))
  }

  ///Order/Get/orderByTableId/{id}
  getOrderDataBytblId(id:number): Observable<any>{
    return this.http.get(`${ApiConfig.URL}${ApiConfig.ORDER}/Get/Orderbytableid/${id}`).pipe(
      map(x => {
        return x;
      }),
      catchError(this.handleError('no records', id))
    )
  }
}
