import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesWithItemsComponent } from './categories-with-items/categories-with-items.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories_with_items', component: CategoriesWithItemsComponent },
      { path: 'item', component: ItemComponent },
      { path: '', redirectTo: 'categories_with_items', pathMatch: 'full' }  // Редирект на страницу категорий с товарами по умолчанию
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class SalesRoutingModule { }
