import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.userData();
      if(user && 
         route.data &&
         route.data.roles && 
         route.data.roles.includes(user.userType)){
           this.authService.pageHeadingSubject$.next(route.data.title)
        return true;
      } 
      else {
        if( !user || user.userType !== 6){ 
        this.router.navigate(['/login'])
        return false;
      }  
     
        return false;
      }
      
  }
  
}
