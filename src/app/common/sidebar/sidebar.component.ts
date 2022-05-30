import { Component, EventEmitter, OnInit, Output, VERSION } from '@angular/core';
import { routingComponents } from '../../app.routing';
import { roleConfig } from '../../constant/rolesConfig';
import { AuthService } from '../../service/auth.service';
import { ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { LanguageComponent } from '../../views/language/language.component';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  lblMenuToggle = 0;
  navMenu: Array<any>;
  userType:number;
  lblsidebar = true;
  @Output() fnMenuSidebar = new EventEmitter();
  constructor(private authService:AuthService,public userr:UserService,public comset:CommonService) { }

  ngOnInit(): void {
    this.userr.getusersetting(this.authService.userData().adminId).subscribe( 
      res=>{
        this.comset.setSetData(res);
      }
    )
     const user = this.authService.userData();
     this.userType = user.userType;
    this.navMenu = [
      {
        name:'Dish',
        badge:'Hello',
        access:roleConfig.authRoles.guest,
        icon:'pi pi-money-bill',
        style:'Font-size:1rem',
        subItems: [
          {
            name:'Dish Category Config',
            routing:'/dish/dish-category-config',
            access:roleConfig.authRoles.admin,
            title:'Dish Category Config'
          },
          {
            name:'Dish Management',
            routing:'/dish',
            access:roleConfig.authRoles.admin,
            title:'Dish Management',
          },
          {
            name:'Menu Management',
            routing:'/dish/dish-menu',
            access:roleConfig.authRoles.guest,
            title:'Menu Management'
          },
          
          {
            name:'Table Configuration',
            routing:'/table-configuration',
            access:roleConfig.authRoles.admin,
            title:'Table Configuration'
          },
          {
            name:'Order Management',
            routing:'/dish/order-list',
            access:roleConfig.authRoles.admin,
            title:'Order Management'
          }
        ]
      },
      {
        name:'Customer',
        routing:'',
        access:roleConfig.authRoles.user,
        icon:'pi pi-user',
        subItems: [
          {
            name:'Customer Management',
            routing:'/users',
            access:roleConfig.authRoles.admin,
            title:'Customer Management'
          },
          // {
          //   name:'Table Config',
          //   routing:'/table-configuration',
          //   access:roleConfig.authRoles.admin,
          //   title:'Table Config'
          // },
          {
            name:'Customer Feedback',
            routing:'/users/user-feedback',
            access:roleConfig.authRoles.user,
            title:'Customer Feedback'
          }
          // {
          //   name:'Order Status',
          //   routing:'/order-status',
          //   access:roleConfig.authRoles.user,
          //   title:'Order Status'
          // } 
        ]
      },
      {
        name:'Captain Management',
        routing:'/captain',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-user-plus',
        title:'Report',
        subItems: []
      },
      {
        name:'Report',
        routing:'/report',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-inbox',
        title:'Report',
        subItems: []
      },
      {
        name:'Franchise',
        routing:'/franchise',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-sitemap',
        title:'Franchise',
        subItems: []
      },
      {
        name:'Setting',
        routing:'/setting',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-shield',
        title:'Setting',
        subItems: []
      },
      // {
      //   name:'Help',
      //   routing:'/help',
      //   access:roleConfig.authRoles.admin,
      //   icon:'pi pi-slack',
      //   title:'Help',
      //   subItems: []
      // },
      // {
      //   name:'Language',
      //   routing:'/language',
      //   access:roleConfig.authRoles.admin,
      //   icon:'pi pi-book',
      //   title:'Language',
      //   subItems: []
      // },
      {
        name:'Help',
        routing:'/help',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-slack',
        title:'Help',
        subItems: []
      },
      // {
      //   name:'Hotel Admin',
      //   routing:'/hotel-admin',
      //   access:roleConfig.authRoles.admin,
      //   icon:'pi pi-users',
      //   title:'Hotel Admin',
      //   subItems: []
      // }, 
     
    
      {
        name:'Master Admin',
        routing:'/admin-setting',
        access:roleConfig.authRoles.sa,
        icon:'pi pi-id-card',
        title:'Master Admin',
        subItems: []
      }
    ]

  }
  
  fnToggle(n:number){
    this.lblMenuToggle = this.lblMenuToggle == n ? 0 : n;
   
  }
  fnToggleSidebar(){
    this.lblsidebar = !this.lblsidebar;
    
  }
  
}
