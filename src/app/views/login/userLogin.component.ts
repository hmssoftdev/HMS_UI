import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserLogin } from '../../models/userLogin';
import { AuthService } from '../../service/auth.service';
import { ShareDataService } from '../../service/share-data.service';
import { StorageService } from '../../service/storage.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: 'userLogin.component.html',
  styleUrls:['./userLogin.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin;
  userList: UserLogin[] = [];
  storage: Storage;
  users:UserLogin;
  otpInput:null;
  constructor(
    public userSvc: UserService, 
    private authService: AuthService, 
    private storageService:StorageService,
    private router: Router,
    private location: Location,
    public sharedata:ShareDataService) {
    this.storage = this.storageService.get();
  }
  ngOnInit(): void {
    this.users = {};
    this.userList = [{username: '' , password: '', contact: 1234567890}];
    if(this.authService.loggedIn()){
      this.location.back();
    }
  }

  keypress(e: KeyboardEvent){
    console.log(e.key,"check")
    if(e.key === 'Enter'){
      this.loginUser();
    }
  }
  loginUser(){  
    this.authService.loginUser(this.users).subscribe(
      (resp:any)=>{
        this.storage.setItem('HMSToken', resp.token); 
        this.storage.setItem('HMSUserData',JSON.stringify(resp));
        this.authService.uLoggedInSubject$.next(true);
        
        this.sharedata.sendId(this.authService.userData().adminId);


        switch(resp.userType){
          case 1:
          this.router.navigate(['/admin-setting']);
          // window.location.reload();
          break;
          case 2:
          this.router.navigate(['/dish']);
          // window.location.reload();
          break;
          default:
          this.router.navigate(['/dish/dish-menu']);
          // window.location.reload();
        } 
      },
      err=> {
        alert(err.error.message)
      }
    )
  }
  

 }
