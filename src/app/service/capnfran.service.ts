import { Injectable } from '@angular/core';
import { franchis } from '../models/franchise';
import { HttpClient } from '@angular/common/http';

// import { resourceUsage } from 'process';
import { Observable, Observer, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
@Injectable({
  providedIn: 'root'
})
export class CapnfranService {
  franchis:franchis[]
  franchiseURL=`${ApiConfig.URL}${ApiConfig.FRANCHISE}`
  constructor(private http: HttpClient) { }

  AddFranchise(franchis:franchis): Observable<franchis> {
    return this.http.post<franchis>(this.franchiseURL, franchis).pipe(
      map(x => {
        console.log(x)
        return x;
      }),
      catchError(this.handleError('', franchis))
    );
  }
  GetFranchise(id:number):Observable<franchis>{
    return this.http.get(`${this.franchiseURL}/GetById/${id}`).pipe(
      map(x=>{
        return x;
      }),
      catchError(this.handleError(''))
    )
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     // console.error(error);
      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
