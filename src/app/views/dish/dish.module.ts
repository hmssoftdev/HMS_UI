import { NgModule } from '@angular/core';  
import { DishRoutingModule } from './dish-routing.module';
import { DishComponent } from './dish.component';
import { DishMenuComponent } from './dish-menu/dish-menu.component';
import { SharedModule} from './../../shared/shared.module';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DishCategoryConfigComponent } from './dish-category-config/dish-category-config.component';
import { BillingComponent } from './billing/billing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { KOTItemsComponent } from './kot-items/kot-items.component';
import { DiningTableComponent } from './dining-table/dining-table.component';
import { DishMenuNewComponent } from './dish-menu-new/dish-menu-new.component';
import { TranslateModule } from '@ngx-translate/core';


// import { CardDetailsComponent } from './card-details/card-details.component';
@NgModule({
  imports: [
    SharedModule,
    DishRoutingModule,
    TranslateModule,
  ],
  declarations: [DishComponent,DishMenuComponent, CardDetailsComponent, CheckoutComponent, DishCategoryConfigComponent, BillingComponent, OrdersListComponent, KOTItemsComponent, DiningTableComponent, DishMenuNewComponent, CardDetailsComponent],
 
})
export class DishModule { }
