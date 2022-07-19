import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setting } from '../../models/setting';
import { AuthService } from '../../service/auth.service';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
lang:string='';
setting:setting;
userData:any
@Output() fnMenuSidebar = new EventEmitter();
@Output() logOut = new EventEmitter();
  constructor(public comset:CommonService,public authService: AuthService,public translate: TranslateService,public user:UserService) { 
    translate.addLangs(['English', 'Hindi','Gujrati','Marathi','Bengali']);
    // translate.setDefaultLang('english');
  }
  // switchLang(lang) {
  //   // this.user.langdata.next(lang.value);
  //   this.translate.use(lang);
  //   this.user.langdata.next(lang.value)
  //   // this.translate.use(lang);
  //   this.translate.setDefaultLang(lang.value);
  // }
  lbluserProfleShow = false;
  ngOnInit(): void {  
    this.userData = this.authService.userData();
    this.user.getusersetting(this.authService.userData().adminId).subscribe(
      x => {
        if(x){ 
          if(x.language){
            this.setting = x;

          this.comset.setLangData(this.setting.language);
          this.translate.setDefaultLang(this.setting.language)
         
          }
          
          
        }
       
      }
    )
  }





  fnLogout(){
    this.logOut.emit();
    this.lbluserProfleShow = false;
    this.authService.pageHeadingSubject$.next('HMS')
  }
  fnToggleUProfile(){
    this.lbluserProfleShow = !this.lbluserProfleShow;
  }
  fnhmBurgerClick(){
this.fnMenuSidebar.emit();
  }
  fnhidedd(){
    this.lbluserProfleShow == false;
  this.lbluserProfleShow = false;
  console.log("Hello");
}
}