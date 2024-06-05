import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<Items[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() { }

  getCartItems(): Items[] {
    return this.cartItemsSource.value;
  }

  addToCart(item: Items): void {
    const currentItems = this.getCartItems();
    const itemIndex = currentItems.findIndex(cartItem => cartItem.itemId === item.itemId);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantityAvailable += item.quantityAvailable;
    } else {
      currentItems.push(item);
    }

    this.cartItemsSource.next(currentItems);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.getCartItems().filter(item => item.itemId !== itemId);
    this.cartItemsSource.next(currentItems);
  }

  clearCart(): void {
    this.cartItemsSource.next([]);
  }
}

