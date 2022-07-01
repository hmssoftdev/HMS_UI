import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResetpaswordComponent } from './resetpasword/resetpasword.component';
// import { CaptainComponent } from './captain/captain.component';
import { SharedModule} from'../shared/shared.module';
import { InventoryModule } from './inventory/inventory.module';
import { LicenseComponent } from './license/license.component';
// import { PurchaseComponent } from './inventory/purchase/purchase.component';
// import { RecipesComponent } from './inventory/recipes/recipes.component';
// import { StockstatusComponent } from './inventory/stockstatus/stockstatus.component';

// import { FranchiseComponent } from './franchise/franchise.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    InventoryModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ResetpaswordComponent,
    LicenseComponent,
    // PurchaseComponent,
    // RecipesComponent,
    // StockstatusComponent,

    // FranchiseComponent,
    // CaptainComponent
  ],

  exports:[TranslateModule] 
})
export class ViewsModule { }
export function httpTranslateLoader(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http);
}
