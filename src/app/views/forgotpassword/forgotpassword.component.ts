import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  mssg: Message[];
 validateemaildid: boolean = false;
 emailid: string = '';
  constructor(private messageServie: MessageService,private user: UserService,private auth:AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.auth.userData());
    

  }
  showResponse(event) {
    this.messageServie.add({severity:'info',
     summary:'SuccessFully', detail: 'Verified',life: 3000});

}
forgetpassword(){

  this.messageService.add({severity:'success', summary:'Email Sended On Id',life: 3000});
console.log(this.emailid);
this.user.forgotpassword(this.emailid).subscribe(x=>{
  console.log(x);
})
}

}
