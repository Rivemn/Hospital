import { Component } from '@angular/core';

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
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor() { }

  onSubmit(): void {
    if (this.checkoutData) {
      console.log('Order Submitted', this.checkoutData);
      // Здесь можно добавить код для отправки данных на сервер
    }
  }
}
