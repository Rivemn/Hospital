import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private localStorageKey = 'cartItems';
  private cartItemsSource = new BehaviorSubject<{ item: Items, quantity: number }[]>(this.loadCartItemsFromLocalStorage());
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() { }

  private loadCartItemsFromLocalStorage(): { item: Items, quantity: number }[] {
    const cartItemsJSON = localStorage.getItem(this.localStorageKey);
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }

  private saveCartItemsToLocalStorage(items: { item: Items, quantity: number }[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

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
    this.saveCartItemsToLocalStorage(currentItems);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.getCartItems().filter(cartItem => cartItem.item.itemId !== itemId);
    this.cartItemsSource.next(currentItems);
    this.saveCartItemsToLocalStorage(currentItems);
  }

  clearCart(): void {
    this.cartItemsSource.next([]);
    this.saveCartItemsToLocalStorage([]);
  }

  updateCartItems(updatedItems: { item: Items, quantity: number }[]): void {
    this.cartItemsSource.next(updatedItems);
    this.saveCartItemsToLocalStorage(updatedItems);
  }

  getTotalPrice(): number {
    return this.getCartItems().reduce((total, cartItem) => total + (cartItem.item.unitPrice * cartItem.quantity), 0);
  }
}

