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
  // mssg: Message[];
//  validateemaildid: boolean = false;
 emailid: string = '';
url:string='http://hmsangularbucket.s3-website.us-east-2.amazonaws.com/'
  constructor(private messageServie: MessageService,private user: UserService,private auth:AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.auth.userData());
  
  }
  showResponse(event) {
    this.messageServie.add({severity:'info',
     summary:'SuccessFully', detail: 'Verified',life: 3000});

}
forgetpassword(){
var a= "#"
 var urll=this.url+encodeURIComponent(a)
this.user.forgotpassword(this.emailid,urll).subscribe(x=>{
  if(x==true){
    this.messageService.add({severity:'info', summary:'Link For Reset Has Send To Email ID',life: 3000});
  }
})
}

}
