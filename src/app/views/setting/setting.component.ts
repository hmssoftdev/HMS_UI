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
  language,
  setting
} from '../../models/setting';
import {
  CommonService
} from '../../service/common.service';

import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  mssg: Message[];
  form: FormGroup;
  userid: number;
  setting:setting;
  want :string;  
  set:setting;
  langa:language[];
  langchange:string;
  themm:string;
  msgs: Message[];
  place=true;
  msgService: any;

  constructor(public themee:ThemeService,
    public translate:TranslateService,
    private authService: AuthService, 
    private comset: CommonService,
    private fb: FormBuilder, 
    private messageService: MessageService, 
    private user: UserService, 
    private router: Router) {
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
    // this.comset.CommonSetting$.next(this.setting);
    this.fnFetchingApi();
    // this.changeTheme();
    // this.comset.setLangData(this.setting.language);
    this.langa=[
      {name:'English'},
      {name:'Hindi'},
      {name:'Marathi'},
      {name:'Gujrati'},
      {name:'Bengali'},
      
    ];
    // this.translate.setDefaultLang(this.setting.language);
    // this.translate.reloadLang(this.setting.language)
    console.log(this.setting.language);
  }
  fnFetchingApi() {
    this.user.getusersetting(this.userid).subscribe(
      x => {
        if (x != null){
          this.setting = x;
          this.comset.setLangData(this.setting.language);
          this.translate.setDefaultLang(this.setting.language)
          this.comset.setSetData(this.setting);
          if(this.setting.theme === 0)
          {
      this.themm='saga-blue';
      console.log(this.themm)
          }
          else{
            this.themm='vela-blue'
          }
         

            this.themee.switchTheme(this.themm)
               
          
          console.log(this.setting.language)
        }
         
        else {
          this.setting = this.getDefaultSetting()
        }
      }
    )

  }

  onChange(event) {
    
      this.translate.use(event.value);
      // this.user.langdata.next(event.value)
      this.user.langdata.next(event.value)
      this.langchange=event.value;
    
    // console.log(this.setting.language);
    //  console.log(this.langchange)
    //  console.log("Mubashir",event.value);
    
    // this.translate.addLangs(['English', 'Hindi','Gujrati','Marathi','Bengali']);

    
}
getDefaultSetting(): setting {
let lanset;
this.comset.Obslangauge.subscribe(x=>{
  lanset=x
})
    let s: setting = {

      id:0,
      theme:0,
    language:lanset,
      activeOrderFlow:0,
      billPrintAndKOT:0,
      directKOTBillPrint:0,
      billPrintAndKOTDining:0,
      billPrintAndKOTHomeDelivery:0,
      billPrintAndKOTTakeAway:0,
      
      
    }
    return s;
  }
  savelang(){
    // console.log("Hello",this.langchange)
    this.user.langdata.next(this.langchange);
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
    this.setting.activeOrderFlow =Number(this.setting.activeOrderFlow);
    this.setting.directKOTBillPrint =Number(this.setting.directKOTBillPrint);
    this.setting.billPrintAndKOT =Number(this.setting.billPrintAndKOT);
    this.setting.billPrintAndKOTDining=Number(this.setting.billPrintAndKOTDining); 
    this.setting.billPrintAndKOTHomeDelivery=Number(this.setting.billPrintAndKOTHomeDelivery);
     this.setting.billPrintAndKOTTakeAway=Number(this.setting.billPrintAndKOTTakeAway);





    this.setting.language=this.langchange;

// this.user.setting.next(this.setting);

    if (this.setting.id==0)
     this.user.postusersetting(this.setting).subscribe(
        x => {
          this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks',life:2000});
          console.log(x);
          window.setTimeout('alert("SuccessFully Updated Setting");window.close();',1000);
          // alert("SuccessFully Updated Setting")
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFully Updated Setting',life :1000
          });
         
        }
      );
    else
      this.user.putusersetting(this.setting).subscribe(
        x => {
          console.log(x);
         
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFully Updated Setting',life :1000
          });
        }
      );
            

    //  this.msgs.push({severity:'info', summary:'SuccessFully Updated Setting',life:2000});

 
    console.log(this.setting);
    // this.comset.CommonSetting$.next(this.setting);
  }

  changework() {

    // this.msgs.show({severity:'info', summary:'Info Message', detail:'PrimeNG rocks',life:2000});
  }
  loginUser() {

  }
  updatingpass() {
        let userdetail = {
      npwd: this.form.value.newpassword,
      oldpwd: this.form.value.oldpwsd,
      Id: this.userid}
    let newpwd = {
      npwd: this.form.value.newpassword
    }as any;
    let opwd = {oldpwd: this.form.value.oldpwsd}as any;let id = {
      Id: this.userid}as any;
    console.log(userdetail, "hello");
    this.user.updatepassword(this.form.value.oldpwsd, this.form.value.newpassword, this.userid).subscribe(x => {
      console.log(x);
      this.messageService.add({
        severity: 'success',
        summary: 'Password Changed',life :2000
      });
    })
  }
}
