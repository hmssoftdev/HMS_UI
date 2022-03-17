import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Output() fnMenuSidebar = new EventEmitter();
@Output() logOut = new EventEmitter();
  constructor(public authService: AuthService,public translate: TranslateService) { 
    translate.addLangs(['english', 'hindi','gujrati','marathi','bengali']);
    translate.setDefaultLang('english');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
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
