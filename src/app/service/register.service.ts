import { Injectable } from '@angular/core';
import { ApiConfig } from '../constant/api';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../models/registration';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = `${ApiConfig.URL}${ApiConfig.USER}`;
  public register: Registration;
  public registeredList: Registration[] = [];
  constructor(
    private http: HttpClient
  ) { }

  AddUser(user: Registration): Observable<Registration> {

    return this.http.post<Registration>(this.url, user).pipe(
      map(x => {
        this.registeredList.push(x);
        return user;
      }),
      catchError(this.handleError('', user))
    );
  }
  registerAdmin(admin:Registration,urll:string):Observable<Registration>{
    return this.http.post<Registration>(`${this.url}/PostAnonymousUser`, admin ).pipe(
      map(res =>{
        admin=res
        
        return res}),
      catchError(this.handleError('',admin))
    )
  }
  updateUser(user: Registration): Observable<Registration> {
    return this.http.put<Registration>(`${this.url}`, user).pipe(
      map(x => {
        // tslint:disable-next-line:prefer-const
        let index = this.registeredList.findIndex(i => i.id === x.id)
        this.registeredList[index] = x;
        return user;
      }),
      catchError(this.handleError('', user))
    );
  }

  getRegisteredUser(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.url).pipe(
      map(x => {
        this.registeredList = x;
        return this.registeredList;
      })
    );
  }

  addAdmin(admin: Registration){
    return this.http.post(`${this.url}`,admin).pipe(
      map(resp => resp),
      catchError(this.handleError('Admin Create', admin))
    )
  }
  updateAdmin(admin: Registration){
    return this.http.put(`${this.url}`,admin).pipe(
      map(resp => resp),
      catchError(this.handleError('Admin Update', admin))
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
