import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Customers } from '../models/Customers';
import { AuthorizationService } from '../authorization/service/authorization.service';
import { AuthStateService } from '../authorization/service/auth-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  role: string = 'customer'; // Устанавливаем значение по умолчанию
  customer: Customers = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    passwordHash: '',
  };

  constructor(private http: HttpClient, private authStateService: AuthStateService,
    private authService: AuthorizationService, private router: Router) { }

  register() {
    this.http.post<any>('/api/registration/customer', this.customer).subscribe(response => {
      console.log('Registration successful', response);
      this.loginAfterRegister();
    }, error => {
      console.error('Registration failed', error);
    });
  }
  loginAfterRegister() {
    this.authService.login(this.customer.email, this.customer.passwordHash, this.role).subscribe(
      response => {
        if (response.userType === 'customer' || response.userType === 'doctor') {
          this.router.navigate(['/']); // Перенаправляем на главную страницу
        }
      },
      error => {
        console.error('Login after registration failed', error);
      }
    );
  }
}
