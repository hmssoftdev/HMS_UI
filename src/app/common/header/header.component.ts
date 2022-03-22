import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
lang:string='';
@Output() fnMenuSidebar = new EventEmitter();
@Output() logOut = new EventEmitter();
  constructor(public authService: AuthService,public translate: TranslateService,public user:UserService) { 
    translate.addLangs(['english', 'hindi','gujrati','marathi','bengali']);
    translate.setDefaultLang('english');
  }
  switchLang(lang) {
    // this.user.langdata.next(lang.value);
    this.translate.use(lang);
    this.user.langdata.next(lang.value)
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
