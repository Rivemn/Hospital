import { Component, OnInit } from '@angular/core';
import { Items } from '../models/Items';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-sales-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { item: Items, quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotalPrice();
    });
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
    this.updateTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateTotalPrice();
  }

  updateCart(): void {
    this.cartService.updateCartItems(this.cartItems);
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  validateQuantity(cartItem: { item: Items, quantity: number }): void {
    if (cartItem.quantity > cartItem.item.quantityAvailable) {
      cartItem.quantity = cartItem.item.quantityAvailable;
    } else if (cartItem.quantity < 1) {
      cartItem.quantity = 1;
    }
    this.updateCart();
  }
}

