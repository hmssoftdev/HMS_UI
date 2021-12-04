import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ApiConfig } from '../constant/api';
import { Dish, DishCategory } from '../models/dish';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/internal/operators'; 
import { StorageService } from './storage.service'; 
@Injectable({
  providedIn: 'root'
})

export class DishService {

  // #region properties
  url = `${ApiConfig.URL}${ApiConfig.DISH}`;
  categoryUrl = `${ApiConfig.URL}${ApiConfig.DISHCATEGORY}`;
  public dish: Dish | undefined;
  public dishList: Dish[] = [];
  public categoryList: DishCategory[] = [];
  public category: DishCategory;
  modalSubject = new Subject();
  modalObservable = this.modalSubject.subscribe();

  editModalSubject = new Subject<Dish>();
  editModalObservable = this.editModalSubject.subscribe();
  storage: Storage;
  uData = JSON.parse(localStorage.getItem('HMSUserData'));

  //#endregion properties

  //#region Constructor
  constructor(private httpClient: HttpClient, private storageStorage: StorageService) {
  }
  //#endregion Constructor

  //#region Method
  // Adding new data
  
  Add(dish): Observable<Dish> {

    return this.httpClient.post<Dish>(this.url, dish).pipe(
      map(x => {
        this.dishList.push(x);
        return dish;
      }),
      catchError(this.handleError('', dish))
    );
  }
  
  //updating exisiting data
  update(dish): Observable<Dish> {
    return this.httpClient.put<Dish>(`${this.url}`, dish).pipe(
      map(x => {
        var index = this.dishList.findIndex(i => i.id == x.id)
        this.dishList[index] = x;
        return dish;
      }),
      catchError(this.handleError('', dish))
    );
  }

  deleteData(id: number): Observable<Dish> {
    return this.httpClient.delete<Dish>(`${this.url}?id=${id}`).pipe(
      catchError(this.handleError('', this.dish)))
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     // console.error(error);
      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

//edit the dish item
  edit(id: number): Dish {
    return this.dishList.find(i => i.id == id);
  }

  // get all dish list
  getList(receivedId: number): Observable<Dish[]> { 
    return this.httpClient.get<Dish[]>(`${this.url}/Get/${receivedId > 0? receivedId: this.uData.adminId}`).pipe(
      map(x => {
        this.dishList = x;
        return this.dishList;
      })
    );
  }

  // get dishcategory list
  getDishCategory(receivedId: number): Observable<DishCategory[]> {
    return this.httpClient.get<DishCategory[]>(`${this.categoryUrl}/Get/${receivedId > 0? receivedId: this.uData.adminId}`).pipe(
      map(x => {
        return x;
      })
    );
  }

  // add new dishcategory
  addDishCategory(CategoryItm:DishCategory):Observable<any>{ 
      return this.httpClient.post<DishCategory>(this.categoryUrl, CategoryItm).pipe(
        map(resp => {
          return CategoryItm;
        }),
        catchError(this.handleError('Add Category', CategoryItm))
      );
  }
  updateDishCategory(CategoryItm:DishCategory):Observable<DishCategory>{ 
    return this.httpClient.put<DishCategory>(this.categoryUrl, CategoryItm).pipe(
      map(x => {
        var index = this.categoryList.findIndex(i => i.id == x.id)
        this.dishList[index] = x;
        return this.category;
      }),
      catchError(this.handleError('', this.category))
    );
}
deleteCategoryData(id: number): Observable<DishCategory> {
  return this.httpClient.delete<DishCategory>(`${this.categoryUrl}?id=${id}`).pipe(
    catchError(this.handleError('', this.category)))
}

  fileUpload(fData){
    return this.httpClient.post(`${ApiConfig.URL}api/FileUpload/Upload`,fData).pipe(
      map(x => { return x}),
      catchError(this.handleError(''))
    )

  }
  openModal() {
    this.modalSubject.next();
  }

  openEditModel(id: number) {
    var dish = this.dishList.find(i => i.id == id);
    console.log(id);
    console.log(dish)
    this.editModalSubject.next(dish);
  }
  //#endregion Method
}