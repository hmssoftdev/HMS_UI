import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { Router } from '@angular/router'; 
import { Message, MessageService } from 'primeng/api';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-updatepasswrod',
  templateUrl: './updatepasswrod.component.html',
  styleUrls: ['./updatepasswrod.component.scss']
})
export class UpdatepasswrodComponent implements OnInit {
  mssg: Message[];
  form: FormGroup;
  userid:number;
  constructor(private authService:AuthService,
    private fb: FormBuilder,private messageService: MessageService,private user:UserService,private router: Router) { 
    this.form = fb.group({

      newpassword: ['', [Validators.required,Validators.maxLength(10)]],
       

      confirm_password: ['', [Validators.required,Validators.maxLength(10)]],

      oldpwsd:['',[Validators.required]]

    }, { 

      validator: ConfirmedValidator('newpassword', 'confirm_password')

    })
    this.userid = authService.userData().adminId;
  }


  ngOnInit(): void {
 

  }
  submit(){

    console.log(this.form.value);

  }
  changework(){
    
    console.log("Password Change Work")
  }
loginUser(){  
  
}
updatingpass(){
 
  let userdetail={npwd: this.form.value.newpassword,
    oldpwd:this.form.value.oldpwsd,Id: this.userid
  }
 let newpwd={npwd:this.form.value.newpassword} as any;
  let opwd={oldpwd:this.form.value.oldpwsd}as any;
    let id ={Id: this.userid}as any;
console.log(userdetail,"hello");
this.user.updatepassword(this.form.value.oldpwsd,this.form.value.newpassword,this.userid).subscribe(x=>{
  console.log(x);
  this.messageService.add({severity:'success', summary:'Password Changed'});
})
  // this.user.updatepassword(userdetail).subscribe(
  //   x=>{
  //     if(x == true)
  //     {
  //       console.log("Hello");
  //     }
      
  //   }
  // )
  
}

}
