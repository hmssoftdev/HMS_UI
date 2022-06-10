import { Injectable } from '@angular/core';
import { captain, franchis } from '../models/franchise';
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
  captainUrl=`${ApiConfig.URL}${ApiConfig.CAPTAIN}`
  captain:captain[]=[]
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
  AddCaptain(cap:captain): Observable<captain> {
    return this.http.post<captain>(this.captainUrl, cap).pipe(
      map(x => {
        console.log(x)
        return x;
      }),
      catchError(this.handleError('', cap))
    );
  } 
  ReadCaptain(id:number): Observable<captain[]> {
    return this.http.get<captain[]>(`${this.captainUrl}/GetById/${id}`).pipe(
      map(x => {
        console.log(x)
        return this.captain= x;
      })
    );
  }
  UpdateFranchsie(franch:franchis):Observable<franchis>{
    return this.http.put(this.franchiseURL,franch).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError('',franch))
    )
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
