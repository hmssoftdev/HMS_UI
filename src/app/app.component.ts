import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { navItems } from './_nav';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { UserService } from './service/user.service';
import { setting } from './models/setting';
import { CommonService } from './service/common.service';
import { SettingComponent } from './views/setting/setting.component';

@Component({
  // tslint:disable-next-line
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IconSetService],
})
export class AppComponent implements OnInit { 
  @ViewChild(SidebarComponent) private sideBarComp:SidebarComponent;
  storage: Storage;
  isLoggedin:boolean; 
  // setting:setting;
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    public authService:AuthService,
    private user:UserService,
    private storageService: StorageService,private users: UserService,private cmser:CommonService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
    this.storage = this.storageService.get();
  }
  uLoggedIn:boolean;
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit() { 
    const uData = JSON.parse(this.storage.getItem('HMSUserData'));
    if(uData && uData.userType != 4){
      this.authService.uLoggedInSubject$.next(true)
      this.authService.uLoggedInSubject$.subscribe(resp => this.uLoggedIn = resp)
  } else {
    this.storage.setItem('HMSUserData',JSON.stringify({userType:4}))
    
  }
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    // this.fnFetchingApi();
// this.user.getusersetting(this.authService.userData().adminId).subscribe(x=>{
// this.setting=x;
// console.log(this.setting);
// })
//  this.setting=this.cmser.getsettingData();

  }
  fnMenuSBarClick(){
    this.sideBarComp.fnToggleSidebar(); 
  }

  fnLogout(){
    this.authService.logoutUser();
    this.authService.uLoggedInSubject$.next(false);
    this.router.navigate(['/login'])
    this.isLoggedin = false;
  }
}
