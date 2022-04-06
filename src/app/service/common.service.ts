import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { ApiConfig } from '../constant/api';
import { Listmodal } from '../models/listModal';
import { setting } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class CommonService { 
  cityUrl = `${ApiConfig.URL}${ApiConfig.CITY}`;
  stateUrl = `${ApiConfig.URL}${ApiConfig.STATE}`;

  public language$ = new BehaviorSubject('English');
  public Obslangauge = this.language$.asObservable();

  setLangData(data){
   return this.language$.next(data); 
  }

  

  // getLangData(x:any){
  //   return this.Obslangauge.subscribe(res=>{
  //     x=res;
  //     return x;
  //   })
  // }
  // getLangData(){
  //   this.Obslangauge.subscribe();
  // }
  public SettingData$:BehaviorSubject<setting>= new BehaviorSubject(null);
  public obsSetData= this.SettingData$.asObservable();
  setSetData(data){
    return this.SettingData$.next(data);
  }
  // public acceptedsetting:any;
  // public CommonSetting$ :BehaviorSubject<setting> = new BehaviorSubject(null);
  // public ObsCommonsetting = this.CommonSetting$.asObservable();
  constructor(private http: HttpClient) { }
// getsettingData(){
//      return  this.CommonSetting$.getValue();
// }
  getCities(): Observable<Listmodal[]> {
    return this.http.get<Listmodal[]>(this.cityUrl).pipe(
      map(x => {
        return x;
      })
    );
  }
// getSetting(data:setting){
//   this.acceptedsetting.push(data);
//     this.CommonSetting$.next(this.acceptedsetting);   
//         console.log(this.CommonSetting$);
// }
  getStates(): Observable<Listmodal[]> {
    return this.http.get<Listmodal[]>(this.stateUrl).pipe(
      map(x => {
        return x;
      })
    );
  }
}
