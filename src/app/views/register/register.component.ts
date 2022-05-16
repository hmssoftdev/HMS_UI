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
  passmeter:boolean=false;
  message:boolean=true
  barLabel: string='Password ';  

  bar0: string;  

  bar1: string;  

  bar2: string;  

  bar3: string;  



  private colors = ['#F00', '#F90', '#FF0', '#9F0'];
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
  private setBarColors(count, col) {  
 
    for (let _n = 0; _n < count; _n++) {  
      this['bar' + _n] = col;  

    }  

}  

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
  
  private static  measureStrength(pass: string) {  
 
    let score = 0;       // award every unique letter until 5 repetitions  

    let letters = {};  

    for (let i = 0; i< pass.length; i++) {  
  letters[pass[i]] = (letters[pass[i]] || 0) + 1;  

    score += 4.0 / letters[pass[i]];  
  }  

    // bonus points for mixing it up  

    let variations = {  

    digits: /\d/.test(pass),  

    lower: /[a-z]/.test(pass),  

    upper: /[A-Z]/.test(pass),  

    nonWords: /\W/.test(pass),  

    };  

    let variationCount = 0;  
          for (let check in variations) {  

    variationCount += (variations[check]) ? 1 : 0;  

    }  

    score += (variationCount - 1) * 10;  

    return Math.trunc(score);  

}  

private getColor(score: number) {  

let idx = 0;  

if (score > 75) {  

  idx = 4;  

} else if (score > 60) {  

  idx = 3;  

} else if (score >= 35) {  

  idx = 2;  

} else if (score >= 20) {  

  idx = 1;  

}  

return {  

  idx: idx + 1,  

  col: this.colors[idx]  

};  

}  


myFunction(password:string){



this.setBarColors(4, '#DDD');  

if (password) {  

   let c = this.getColor(RegisterComponent.measureStrength(password));  

   this.setBarColors(c.idx, c.col);  

} 
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


