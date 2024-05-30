import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Добавьте это
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesWithItemsComponent } from './categories-with-items/categories-with-items.component';
import { ItemComponent } from './item/item.component';
import { SalesRoutingModule } from './sales-routing.module';
import { CategoriesService } from './categories/service/categories.service';
@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesWithItemsComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    HttpClientModule  // Добавьте это
  ],
  providers: [CategoriesService]  // Добавьте это
})
export class SalesModule { }
