import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Добавьте это
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesWithItemsComponent } from './categories-with-items/categories-with-items.component';
import { ItemComponent } from './item/item.component';
import { SalesRoutingModule } from './sales-routing.module';
import { CategoriesService } from './service/categories.service';


import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SalesHeaderComponent } from './sales-header/sales-header.component';
import { SalesComponent } from './sales.component';
@NgModule({
  declarations: [
    SalesComponent,
    CategoriesComponent,
    CategoriesWithItemsComponent,
    ItemComponent,
    ShoppingCartComponent,
    SalesHeaderComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    HttpClientModule  // Добавьте это
  ],
  exports: [
    SalesComponent
  ],
  providers: [CategoriesService] , // Добавьте это

})
export class SalesModule { }
