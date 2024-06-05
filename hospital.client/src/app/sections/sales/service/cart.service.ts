import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<{ item: Items, quantity: number }[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() { }

  getCartItems(): { item: Items, quantity: number }[] {
    return this.cartItemsSource.value;
  }

  addToCart(item: Items, quantity: number = 1): void {
    const currentItems = this.getCartItems();
    const itemIndex = currentItems.findIndex(cartItem => cartItem.item.itemId === item.itemId);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += quantity;
    } else {
      currentItems.push({ item, quantity });
    }

    this.cartItemsSource.next(currentItems);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.getCartItems().filter(cartItem => cartItem.item.itemId !== itemId);
    this.cartItemsSource.next(currentItems);
  }

  clearCart(): void {
    this.cartItemsSource.next([]);
  }

  updateCartItems(updatedItems: { item: Items, quantity: number }[]): void {
    this.cartItemsSource.next(updatedItems);
  }

  getTotalPrice(): number {
    return this.getCartItems().reduce((total, cartItem) => total + (cartItem.item.unitPrice * cartItem.quantity), 0);
  }
}
