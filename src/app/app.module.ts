import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
 import { LoginComponent } from './views/login/userLogin.component';
//  import { BillingComponent } from './views/dish/billing/billing.component';
// import { RegisterComponent } from './views/register/register.component';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
  
} from '@coreui/angular';

// Import routing module
// import { AppRoutingModule, routingComponents } from './app.routing';

// Import 3rd party components
import { AdminModule } from '../app/views/admin-setting/admin.module'
import { SharedModule } from './shared/shared.module'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule,  routingComponents} from './app.routing';
import { ClientConfigComponent } from './views/client-config/client-config.component';
import { MasterAdminModule } from '../app/views/master-admin/master-admin.module';
import { LocalStorageService, StorageService } from './service/storage.service';
import { RegisterComponent } from '../app/views/register/register.component'
import { AuthService } from './service/auth.service';
import { AuthGuard } from './helpers/auth.guard'; 
import { TokenInterceptorService } from './helpers/token-interceptor.service';
import { HotelAdminModule } from './views/hotel-admin/hotel-admin.module';
import { UserModule } from '../app/views/user/user.module';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { UpdatepasswrodComponent } from './views/updatepasswrod/updatepasswrod.component'; 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HotelAdminModule,
    AppRoutingModule,
    SharedModule,
    AppAsideModule,
    AdminModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MasterAdminModule, 
  ],
  declarations: [
    AppComponent, 
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    routingComponents,
    ClientConfigComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UpdatepasswrodComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService, 
      { provide: StorageService, useClass: LocalStorageService },
      {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
