import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from 'rxjs';
import { roleConfig } from './constant/rolesConfig';
import { AuthGuard } from './helpers/auth.guard';
import { AdminSettingComponent } from './views/admin-setting/admin-setting.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/userLogin.component'; 
import { RegisterComponent } from './views/register/register.component'; 
import { InvoiceComponent } from './views/invoice/invoice.component'
import { TableConfigurationComponent } from '../app/views/hotel-admin/table-configuration/table-configuration.component'
import { OrderStatusComponent } from './shared/order-status/order-status.component';
import { UpdatepasswrodComponent } from './views/updatepasswrod/updatepasswrod.component';
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ReportComponent } from './views/report/report.component';
import { LanguageComponent } from './views/language/language.component';
import { SettingComponent } from './views/setting/setting.component';
import { HelpComponent } from './views/help/help.component';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: {
      title: 'invoice',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'dish',
    loadChildren: () => import('./views/dish/dish.module').then(m => m.DishModule),
  }, 
  {
    path: 'admin-setting',
    component: AdminSettingComponent,
    data: {
    roles: roleConfig.authRoles.sa
    },
    canActivate: [AuthGuard]

  }, 
  {
    path:'report',
    component:ReportComponent,
    data: {
      roles: roleConfig.authRoles.sa
      },
  },
  {
    path:'language',
    component:LanguageComponent,
    data: {
      roles: roleConfig.authRoles.sa
      },
  },
  {
    path:'setting',
    component:SettingComponent,
    data: {
      roles: roleConfig.authRoles.sa
      },
  },
  {
    path:'help',
    component:HelpComponent,
    data: {
      roles: roleConfig.authRoles.sa
      },
  },
 {
        path: 'hotel-admin',
        loadChildren: () => import('./views/hotel-admin/hotel-admin.module').then(m => m.HotelAdminModule),
      },
    {
        path: 'users',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
     
      },
      {
        path: 'updatepassword',
       component:UpdatepasswrodComponent,
       data: {
        title: 'Register Page',
        roles: roleConfig.authRoles.guest
      }
     
      }, 
      {
        path: 'forgotpassword',
       component:ForgotpasswordComponent,
     },
      {path:'order-status', component:OrderStatusComponent, 
      data: {
        title: "Order Status",
        roles: roleConfig.authRoles.user
      },
        canActivate:[AuthGuard]
      },
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404',
          roles: roleConfig.authRoles.guest
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500',
          roles: roleConfig.authRoles.guest
        }
  },
  {
    path: '',
    redirectTo: '/dish/dish-menu',
    pathMatch: 'full',

      },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [];
