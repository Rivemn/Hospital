import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesWithItemsComponent } from './categories-with-items/categories-with-items.component';
import { ItemComponent } from './item/item.component';
import { SalesRoutingModule } from './sales-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesWithItemsComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule, SalesRoutingModule
   
  ]
})
export class SalesModule { }
