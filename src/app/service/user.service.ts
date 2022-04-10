import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, of, Subject } from 'rxjs';
import { ApiConfig } from '../constant/api';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'; 
import { User, UserFeedback } from '../models/user';
import { Registration } from '../models/registration';
import { OrderList } from '../models/orderList';
import { Historydata } from '../models/historydata';
import { setting } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${ApiConfig.URL}${ApiConfig.USER}`;
  usersetting=`${ApiConfig.URL}${ApiConfig.USERSETTING}`;
  orderUrl = `${ApiConfig.URL}${ApiConfig.ORDER}`;
  cityUrl = `${ApiConfig.URL}${ApiConfig.CITY}`
  stateUrl = `${ApiConfig.URL}${ApiConfig.STATE}`
  feedbackUrl = `${ApiConfig.URL}${ApiConfig.USERFEEDBACK}`
  public feedback: UserFeedback | undefined;
  public feedbackList: UserFeedback[] = []
  public user: User | undefined;
  public userssetting:setting;
  public userList: User[] = [];
  modalSubject = new Subject();
  histdata :Historydata[]=[];
  userData = JSON.parse(localStorage.getItem('HMSUserData'));
  modalObservable = this.modalSubject.subscribe();
  orderList: OrderList[] = [];
  data:string='';
public langdata = new Subject();

  setting= new Subject<setting>();
  // public language$ = new BehaviorSubject('english');
  //  public Obslangauge = this.language$.asObservable();  

  constructor(private http: HttpClient) { }
 
 
  getlanguage(data){ 
    this.langdata.next(data);
}

getsetting(data){
  this.setting.next(data)
}

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

  // pass values as a parameter
  updatepassword(oldpwd:string , newpwd : string,id: number): Observable<boolean> {
    return this.http.put(`${this.url}/updatePassword/?oldPwd=${oldpwd}&newPwd=${newpwd}&userId=${id}`,{}).pipe(
      map(x => {
          console.log(x)
       return false;
      }),
      catchError(this.handleError('',true))
    );
  }
  forgotpassword(emailid :string):Observable<boolean>{
    return this.http.put(`${this.url}/ForgetPassword?email=${emailid}`,{}).pipe(
      map(resp => 
        {
          let op = JSON.parse(JSON.stringify(resp))
          return op.result
        }
          ),
      catchError(this.handleError('', true))
    )
  }
  getUserList(): Observable<User[]> {
  this.userData = JSON.parse(localStorage.getItem('HMSUserData'));
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
  getusersetting(userid:number):Observable<setting>{
    return this.http.get<setting>(`${this.usersetting}?UserId=${userid}`).pipe(
      map(x => {
        this.userssetting = x;
        return this.userssetting;
      })
    )
  }


  // http://hmswebapi-dev.us-east-1.elasticbeanstalk.com/Order/GetOrderByDateRange?userId=1221&maxDate=1232&minDate=1213
  getBillHistory(userid :number,maxdate :string,mindate:string): Observable<Historydata[]> {
    return this.http.get<Historydata[]>
    (`${this.orderUrl}/GetOrderByDateRange?userId=${userid}&maxDate=${maxdate}&minDate=${mindate}`,{}).pipe(
      map(x => {
        this.histdata = x;
        return this.histdata;
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

  postusersetting(settings:setting):Observable<setting>{
    return this.http.post<setting>(`${this.usersetting}`,settings).pipe(
      map(x =>{
       
        return settings;
      }),
      catchError(this.handleError('',settings))
    );
  }
  putusersetting(setting:setting){
    return this.http.put(`${this.usersetting}`,setting).pipe(
      map(resp => 
        {
         console.log(resp);
        }
          ),
      catchError(this.handleError('',))
    )
  }

}
