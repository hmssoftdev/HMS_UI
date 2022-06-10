import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { DishMenuComponent } from './dish-menu/dish-menu.component';
import { DishComponent } from './dish.component';
import { DishCategoryConfigComponent } from './dish-category-config/dish-category-config.component';
import { AuthGuard } from '../../helpers/auth.guard';
import { roleConfig } from '../../constant/rolesConfig';
import { BillingComponent } from './billing/billing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import {DishMenuNewComponent} from './dish-menu-new/dish-menu-new.component';
const routes: Routes = [
  {
    path: '',
    component: DishComponent,
    data: {
      title: 'Dish Configuration',
      roles: roleConfig.authRoles.franchise
    },
    canActivate:[AuthGuard]
  },
  {
    path:'dish-menu',
    component:DishMenuNewComponent,
    data:{
      title:"Dish Menu",
      roles:roleConfig.authRoles.captain
    },
    canActivate:[AuthGuard]
  },
  // {
  //   path:'dish-menu-new',
  //   component:DishMenuNewComponent,
  //   data:{
  //     title:"Dish Menu",
  //     roles:roleConfig.authRoles.guest
  //   },
  //   canActivate:[AuthGuard]
  // },
  {
    path: 'dish-category-config',
    component: DishCategoryConfigComponent,
    data: {
      title: 'Dish Category Config',
      roles: roleConfig.authRoles.franchise
    },
    canActivate:[AuthGuard]
  },
  // {
  //   path:'checkout',
  //   component:CheckoutComponent,
  //   data:{
  //     title:"Checkout",
  //     roles:roleConfig.authRoles.user
  //   },
  //   canActivate:[AuthGuard]
  // },
  {
    path:'order-list',
    component:OrdersListComponent,
    data:{
      title:"Order List",
      roles:roleConfig.authRoles.franchise
    },
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule {

}
