import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('userId');
  }

  public setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
