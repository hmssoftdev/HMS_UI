import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceUrl = `${ApiConfig.URL}${ApiConfig.INVOICE}`;
  constructor(private http: HttpClient) { }
  getInvoice(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.invoiceUrl}`).pipe(
      map(x => {
        return x;
      })
    );
  } 
}
