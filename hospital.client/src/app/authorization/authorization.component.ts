import { Component } from '@angular/core';
import { AuthorizationService } from './service/authorization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  email: string = '';
  password: string = '';
  role: string = 'customer';
  errorMessage: string = '';


  constructor(private authService: AuthorizationService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password, this.role).subscribe(
      response => {
        if (response.userType === 'Customer' || response.userType === 'Doctor') {

          this.router.navigate(['/']); // Перенаправляем на главную страницу
        
        }
      },
      error => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
