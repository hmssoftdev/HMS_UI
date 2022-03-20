import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { language } from '../../models/setting';
import { AuthService } from '../../service/auth.service';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Output() fnMenuSidebar = new EventEmitter();
@Output() logOut = new EventEmitter();
    language:language;
    lang:string='';
  constructor(public authService: AuthService,public translate: TranslateService,public comlan:UserService) { 
    translate.addLangs(['english', 'hindi','gujrati','marathi','bengali']);
    
  }
  switchLang(lang) {
    this.comlan.langdata.next(lang.value)
    this.translate.use(lang);
    this.translate.setDefaultLang(lang.value);
   
  }
  lbluserProfleShow = false;
  ngOnInit(): void {
  }
  fnLogout(){
    this.logOut.emit();
    this.lbluserProfleShow = false;
    
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
