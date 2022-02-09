import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {CaptchaModule} from 'primeng/captcha';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import {ChartModule} from 'primeng/chart';
import { AppComponent } from './app.component';
import {CalendarModule} from 'primeng/calendar';
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
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ReportComponent } from './views/report/report.component'; 
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import { TodaySummaryComponent } from './views/report/today-summary/today-summary.component';
import { BarChartComponent } from './views/report/bar-chart/bar-chart.component';

import { TopCustDataComponent } from './views/report/top-cust-data/top-cust-data.component';
import { WeekSummaryComponent } from './views/report/week-summary/week-summary.component';

import { HistorydataComponent } from './views/report/historydata/historydata.component';
import { TopdataComponent } from './views/report/topdata/topdata.component';
import { SettingComponent } from './views/setting/setting.component';
import { LanguageComponent } from './views/language/language.component';
import { HelpComponent } from './views/help/help.component';
@NgModule({
  imports: [
    BrowserModule,
    TabViewModule,
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
    CardModule,
    CaptchaModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ChartModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    FormsModule,
    CalendarModule,
    MasterAdminModule, 
  ],
  declarations: [
    AppComponent, 
    ReportComponent,
    WeekSummaryComponent,
    TodaySummaryComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    routingComponents,
    ClientConfigComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UpdatepasswrodComponent,
    ForgotpasswordComponent,
    BarChartComponent,
    HistorydataComponent,
    TopdataComponent,
    WeekSummaryComponent,
    TopCustDataComponent,
    SettingComponent,
    LanguageComponent,
    HelpComponent
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
