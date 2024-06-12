import { Component, OnInit } from '@angular/core';

import { SharedService } from '../service/shared.service';
import { SubcategoriesService } from '../service/subcategories.service';
import { Subcategories } from '../models/Subcategories';
import { ItemsService } from '../service/items.service';
import { CartService } from '../service/cart.service';
import { Items } from '../models/Items';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sales-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

  itemName: string = 'Amoxicillin';
  item: Items | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = true;
  buttonName: string = 'add to cart';
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private sharedService: SharedService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.sharedService.selectedItem$.subscribe(itemName => {
      if (itemName) {
        this.itemName = itemName;
        // Load item details based on itemName
        this.loadItemDetails();
      }
    });
  }

  private loadItemDetails(): void {
    this.itemService.getItemByName(this.itemName).subscribe(
      (item: Items) => {
        this.item = item;
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }
 
  addItemToCart(item: Items) {

    this.cartService.addToCart(item);
    this.buttonName = 'добавлено в корзину';
    }
  
}
