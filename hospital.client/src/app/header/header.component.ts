import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization/service/authorization.service';
import { AuthStateService } from '../authorization/service/auth-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(private authStateService: AuthStateService, private authService: AuthorizationService) { }

  ngOnInit() {
    // Здесь можно добавить код для инициализации, если это необходимо
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get fullName(): string | null {
    const firstName = this.authService.getFirstName();
    const lastName = this.authService.getLastName();
    return firstName && lastName ? `${firstName} ${lastName}` : null;
  }

  logout(): void {
    this.authService.logout();
  }
}
