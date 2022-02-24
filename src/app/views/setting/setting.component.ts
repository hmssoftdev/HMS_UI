import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';
import {
  Message,
  MessageService
} from 'primeng/api';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  ConfirmedValidator
} from '../updatepasswrod/confirmed.validator';
import {
  Router
} from '@angular/router';
import {
  UserService
} from '../../service/user.service';
import {
  AuthService
} from '../../service/auth.service';
import {
  setting
} from '../../models/setting';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  mssg: Message[];
  form: FormGroup;
  userid: number;
  setting: setting ;
  want=true;
  constructor(private users: UserService, private authService: AuthService,
    private fb: FormBuilder, private messageService: MessageService, private user: UserService, private router: Router) {
    this.form = fb.group({

      newpassword: ['', [Validators.required, Validators.maxLength(10)]],


      confirm_password: ['', [Validators.required, Validators.maxLength(10)]],

      oldpwsd: ['', [Validators.required]]

    }, {

      validator: ConfirmedValidator('newpassword', 'confirm_password')

    })
    this.userid = authService.userData().adminId;
    this.setting = this.getDefaultSetting();
  }


  ngOnInit(): void {

    this.fnFetchingApi();
  }
  fnFetchingApi() {
    this.users.getusersetting(this.userid).subscribe(
      x => {
        if (x != null)
          this.setting = x;
        else {
          this.setting =this.getDefaultSetting()
        }
      }
    )

  }

  postdata() {

  }

  getDefaultSetting():setting{
    let s:setting = {
      id:0,theme:0
    }
    return s;
  }

  saveSettings() {
    this.setting.userId = this.userid;
    this.setting.theme = Number(this.setting.theme);
    this.setting.menuDisplay =Number(this.setting.menuDisplay);
    this.setting.billWithCustomer =Number(this.setting.billWithCustomer);
    this.setting.billWithGST =Number(this.setting.billWithGST);
    this.setting.billWithLOGO =Number(this.setting.billWithLOGO);
    this.setting.billWithSeal =Number(this.setting.billWithSeal);
    this.setting.billWithSign =Number(this.setting.billWithSign);
    if(this.setting.id==0)
    this.user.postusersetting(this.setting).subscribe(
      x=>{
        console.log(x);
      }
    );
    else 
    this.user.putusersetting(this.setting).subscribe(
      x=>{
        console.log(x);
      }
    );
    
    console.log(this.setting);
  }

  changework() {

    console.log("Password Change Work")
  }
  loginUser() {

  }
  updatingpass() {

    let userdetail = {
      npwd: this.form.value.newpassword,
      oldpwd: this.form.value.oldpwsd,
      Id: this.userid
    }
    let newpwd = {
      npwd: this.form.value.newpassword
    }as any;
    let opwd = {
      oldpwd: this.form.value.oldpwsd
    }as any;
    let id = {
      Id: this.userid
    }as any;
    console.log(userdetail, "hello");
    this.user.updatepassword(this.form.value.oldpwsd, this.form.value.newpassword, this.userid).subscribe(x => {
      console.log(x);
      this.messageService.add({
        severity: 'success',
        summary: 'Password Changed'
      });
    })
  }


}
