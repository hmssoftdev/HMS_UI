import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { SessionStorageService, StorageService } from './service/storage.service';
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
import { FooditemComponent } from './views/report/fooditem/fooditem.component';
import { HistorydataComponent } from './views/report/historydata/historydata.component';
import { TopdataComponent } from './views/report/topdata/topdata.component';
import { SettingComponent } from './views/setting/setting.component';
import { LanguageComponent } from './views/language/language.component';
import { HelpComponent } from './views/help/help.component';
import { BackdataComponent } from './views/report/backdata/backdata.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ResetpaswordComponent } from './views/resetpasword/resetpasword.component';
import { CaptainComponent } from'./views/captain/captain.component'
import { FranchiseComponent } from './views/franchise/franchise.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { PurchaseComponent } from './views/inventory/purchase/purchase.component';
// import { InventoryModule } from './views/inventory/inventory.module';
import { RecipesComponent } from './views/inventory/recipes/recipes.component';
import { StockstatusComponent } from './views/inventory/stockstatus/stockstatus.component';
// import {InputNumberModule} from 'primeng/inputnumber';
// import {ButtonModule} from 'primeng/button';
// import {MultiSelectModule} from 'primeng/multiselect';
// import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  imports: [
    
    BrowserModule,
    FormsModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  declarations: [
    RecipesComponent,
    StockstatusComponent,
    PurchaseComponent, 
    InventoryComponent,
    CaptainComponent,
    FranchiseComponent,
    AppComponent, 
    ReportComponent,
    ResetpaswordComponent,
    FooditemComponent,
    WeekSummaryComponent,
    TodaySummaryComponent,
    P404Component,
    P500Component,
    LoginComponent,
    BackdataComponent,
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
  exports:[TranslateModule],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService, 
      { provide: StorageService, useClass: SessionStorageService },
      {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}