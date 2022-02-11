import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
 email : string;
 form:FormGroup;

 emailid: string = '';
  constructor(private messageServie: MessageService,private user: UserService,private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.userData());
    

  }
  showResponse(event) {
    this.messageServie.add({severity:'info',
     summary:'SuccessFully', detail: 'Verified'});

}
forgetpassword(){


console.log(this.emailid);
this.user.forgotpassword(this.emailid).subscribe(x=>{
  console.log(x);
})
}
}
