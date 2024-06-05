import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-sales-header',
  templateUrl: './sales-header.component.html',
  styleUrl: './sales-header.component.css'
})
export class SalesHeaderComponent {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }
}
