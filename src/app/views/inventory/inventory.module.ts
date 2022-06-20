import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { StockstatusComponent } from './stockstatus/stockstatus.component';
import { SharedModule } from 'primeng/api';
@NgModule({
  declarations: [
    RecipesComponent,StockstatusComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class InventoryModule { }
