import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = signal(false);
  constructor() {}

  public login() {
    this.isLoggedIn.set(true);
  }

  public logout() {
    this.isLoggedIn.set(false);
  }
}
