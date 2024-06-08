import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from '../../../authorization/service/authorization.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
  };
  isLoggedIn: boolean = false; // Установите значение по умолчанию

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private authService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      // Fill in user data if logged in
      this.checkoutData.email = this.authService.getEmail() ?? '';
      this.checkoutData.fullName = `${this.authService.getFirstName()} ${this.authService.getLastName()}`;
      this.checkoutData.phone = this.authService.getPhone() ?? '';
    }
  }

  onSubmit(): void {
    // Получить все элементы корзины
    const cartItems = this.cartService.getCartItems().map(cartItem => ({
      itemId: cartItem.item.itemId,
      quantity: cartItem.quantity
    }));

    // Создать корзину
    const cart = {
      customerId: this.isLoggedIn ? null : this.checkoutData,
      cartItems: cartItems
    };

    this.http.post('/api/shoppingcart', cart).subscribe(
      (cartResponse: any) => {
        // Создать заказ
        const order = {
          customerId: this.isLoggedIn ? null : this.checkoutData,
          cartID: cartResponse.cartID,
          deliveryPoint: this.checkoutData.address
        };

        this.http.post('/api/orders', order).subscribe(
          (orderResponse: any) => {
            // Обработать успешный ответ от сервера
            console.log('Order placed successfully:', orderResponse);
          },
          error => {
            // Обработать ошибку
            console.error('Error placing order:', error);
          }
        );
      },
      error => {
        // Обработать ошибку создания корзины
        console.error('Error creating shopping cart:', error);
      }
    );

  }
}
