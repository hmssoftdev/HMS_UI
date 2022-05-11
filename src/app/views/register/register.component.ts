import { Component, Type } from '@angular/core';
import { Registration } from '../../models/registration';
import { RegisterService } from '../../service/register.service';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { style } from '@angular/animations';
import { UserService } from '../../service/user.service';
import { Location } from '@angular/common';
import { NgxPasswordStrengthMeterModule, NgxPasswordStrengthMeterService } from 'ngx-password-strength-meter';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent {
  users: Registration;
  submitted = false;
  registeredList: Registration[] = [];
  storage: Storage;
  typeUser: { label: string; value: number; }[];
  userTypeVal: number;
  value:string;
  show:boolean=false
  num=2
  key:string
  usernamecheck:boolean=false;
  usercontactcheck:boolean=false;
  useremailcheck:boolean=false;
  constructor(
    public regSvc: RegisterService,
    public userSvc: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router, 
    private location: Location) {
    this.storage = this.storageService.get();
    // const result = this.passwordStrengthMeterService.calculate('123');
  }


  ngOnInit(): void {
    
  
    // this.userSvc.CheckUserData().subscribe(res=>{

    // })
    this.users = {};
    this.typeUser = [{
      label: 'Admin', value: 2}
    // },
    // {
    //   label: 'User', value: 3
    // }
    ];
    if(this.authService.loggedIn()){
      this.location.back();
    }
  }
  // getUsers() {
  //   this.regSvc.getRegisteredUser().subscribe(res => {
  //     this.registeredList = res;
  //   })
  // }
  validateUsername(username:string){
    this.key='userName'
    this.value=username;
    this.userSvc.CheckUserData(this.key,this.value).subscribe(res=>{
      // this.users=res

      if(res.result == 'Data present')
      {
        console.log(res)
        this.usernamecheck=true;
      }
        // console.log(res,)
      // if(res.result=='Data not present')
      else{
        this.usernamecheck=false
      }

    })
    
  }

  validateEmail(email:string){
    this.key='email'
    this.value=email
    this.userSvc.CheckUserData(this.key,this.value).subscribe(res=>{
      // this.users=res

      if(res.result == 'Data present')
      {
        this.useremailcheck=true;
      }
        // console.log(res,)
      // if(res.result=='Data not present')
      else
      {
        this.useremailcheck=false
      }

    })
  }



  validateContact(contact:string){
    this.key='contact';
    this.value=contact
    this.userSvc.CheckUserData(this.key,this.value).subscribe(res=>{
      // this.users=res

      if(res.result == 'Data present')
      {
        this.usercontactcheck=true;
      }
        // console.log(res,)
      // if(res.result=='Data not present'){
        
      else{
        this.usercontactcheck=false
      }

    })

  }
  register(data: NgForm) { 
    // var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if(this.users.password.matchAll(format))
    //   {
    //       console.log("Mubashir WIn")
    //   }
    this.submitted = true; 
    this.users.userType=2;
    if (this.users.userType === 3) {
      this.userSvc.registerUser(this.users).subscribe(() => {
        this.registeredList.push(this.users);
        alert('User Registration completed');
        this.router.navigate(['/login'])
      })
    } else {
      this.regSvc.registerAdmin(this.users).subscribe(res => {
    
        this.users=res;
        var constt=res.result;
        // console.log(constt)
        if(this.users.result=="User email or Mobile number already in used.")
        {
          alert('Registration with email and number already in use');
        }
        else
        {
          this.registeredList.push(this.users);
          alert('Registration completed');
          this.router.navigate(['/login'])
        }
          // if(res. == "User email or Mobile number already in used.")
          // {
          //   alert('Registration with email and number already in use');
            
          // }
          // else
          // {
          //   this.registeredList.push(this.users);
          //   alert('Registration completed');
          //   this.router.navigate(['/login'])
            
          // }
          
        
        this.users = {}
      })
    }
  }
  
  
}


