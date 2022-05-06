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
 id:string

  encryptlink :string='+nY6p72BKT+36TvwK4DtLswY88WoF8u3g55ptUx22DIii7Wg9ZlnCN6noW7GBwbgeyZ9OUe0hFHskiwcIPiKjF+kKZ1wQL9X9ZlZQSsdggtvzKgcOZzRX+5/TLkPdqyc';
  constructor(public user:UserService,public mssg:MessageService,private activatedRoute: ActivatedRoute) { }
  password:string='';
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id,"Para")
    this.activatedRoute.queryParamMap.subscribe(params => {
      
      // console.log(params,"parameter"); 
      // const queryString = window.location.search;
      // const urlParams = new URLSearchParams(queryString);
      // const code = urlParams.get('code')
      // console.log(urlParams,"urlparam",code,"code")
  });

  }
  resetpassword(){
    this.user.ForgotpasswordReset(this.encryptlink,this.password).subscribe(res=>{

      if (res==true)
      {
      this.mssg.add({severity:'info',summary:'SuccessFully Reset Password', detail: 'Verified',life: 3000});
      }
    })
  }

}
