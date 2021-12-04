import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ApiConfig } from '../constant/api';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/internal/operators'; 
import { User, UserFeedback } from '../models/user';
import { Registration } from '../models/registration';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${ApiConfig.URL}${ApiConfig.USER}`;
  cityUrl = `${ApiConfig.URL}${ApiConfig.CITY}`
  stateUrl = `${ApiConfig.URL}${ApiConfig.STATE}`
  feedbackUrl = `${ApiConfig.URL}${ApiConfig.USERFEEDBACK}`
  public feedback: UserFeedback | undefined;
  public feedbackList: UserFeedback[] = []
  public user: User | undefined;
  public userList: User[] = [];
  modalSubject = new Subject();
  userData = JSON.parse(localStorage.getItem('HMSUserData'));
  modalObservable = this.modalSubject.subscribe();

  constructor(private http: HttpClient) { }
  AddUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user).pipe(
      map(x => {
        this.userList.push(x);
        return user;
      }),
      catchError(this.handleError('', user))
    );
  }
  // Register User through Register form
  registerUser(user:Registration){
    return this.http.post(`${this.url}/PostAnonymousUser`,user).pipe(
      map(resp => resp),
      catchError(this.handleError('', user))
    )
  }
  edit(id: number): User {
    return this.userList.find(i => i.id == id);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}`, user).pipe(
      map(x => {
        let index = this.userList.findIndex(i => i.id === x.id)
        this.userList[index] = x;
        return user;
      }),
      catchError(this.handleError('', user))
    );
  }
  deleteUserData(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}?id=${id}`).pipe(
      catchError(this.handleError('', this.user)));
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/Get/${this.userData.adminId}`).pipe(
      map(x => {
        this.userList = x;
        return this.userList;
      })
    );
  }

  getFeedbacklist(): Observable<UserFeedback[]> {
    return this.http.get<UserFeedback[]>(this.feedbackUrl).pipe(
      map(x => {
        this.feedbackList = x;
        return this.feedbackList;
      })
    )
  }
  
  editEndUser(id: number): User {
    return this.userList.find(i => i.id === id);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  postReview(feedback: UserFeedback): Observable<UserFeedback>{
    return this.http.post<UserFeedback>(`${this.feedbackUrl}`, feedback).pipe(
      map(x => {
        if(x!=null)
          this.feedbackList.push(x);
        return feedback;
      }),
      catchError(this.handleError('', feedback))
    );
  }
}
