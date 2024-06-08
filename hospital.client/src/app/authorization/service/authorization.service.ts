import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthStateService } from './auth-state.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl = '/api/authorization';
  constructor(private http: HttpClient, private authStateService: AuthStateService) { }

  login(email: string, password: string, role: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${role}`;
    return this.http.post<any>(endpoint, { email, password }).pipe(
      map(response => {
        if (response && response.userId && response.userType && response.firstName && response.lastName) {
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('lastName', response.lastName);
          localStorage.setItem('email', response.email);
          localStorage.setItem('phone', response.phone);
          this.authStateService.setLoggedIn(true); // Обновление состояния
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    this.authStateService.setLoggedIn(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getFirstName(): string | null {
    return localStorage.getItem('firstName');
  }

  getLastName(): string | null {
    return localStorage.getItem('lastName');
  }
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getPhone(): string | null {
    return localStorage.getItem('phone');
  }
}
