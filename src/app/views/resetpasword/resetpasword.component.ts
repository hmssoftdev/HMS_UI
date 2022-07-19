import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-resetpasword',
  templateUrl: './resetpasword.component.html',
  styleUrls: ['./resetpasword.component.scss']
})
export class ResetpaswordComponent implements OnInit {
public url:string
id:string
host:string
  
  constructor(public user:UserService,public mssg:MessageService,private activatedRoute: ActivatedRoute) { }
  password:string='';
  ngOnInit(): void {
   this.id = this.activatedRoute.snapshot.queryParamMap.get('param');
    this.activatedRoute.queryParamMap.subscribe(params => {
        
  });
 
  }
  resetpassword(){
    this.user.ForgotpasswordReset(this.id,this.password).subscribe(res=>{
      this.mssg.add({severity:'success',summary:'Successfully Reset Password', detail: 'Verified',life: 3000});
      if (res==true)
      {
        this.mssg.add({severity:'primary',summary:'Please Login', detail: 'Verified',life: 3000});
      }
    })
  }

}
