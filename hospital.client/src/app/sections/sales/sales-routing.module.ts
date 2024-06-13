import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesWithItemsComponent } from './categories-with-items/categories-with-items.component';
import { ItemComponent } from './item/item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [

      { path: 'categories', component: CategoriesComponent },
      { path: 'categories_with_items', component: CategoriesWithItemsComponent },
      { path: 'item', component: ItemComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: '', redirectTo: 'categories', pathMatch: 'full' }  // Редирект на страницу категорий с товарами по умолчанию
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class SalesRoutingModule { }
