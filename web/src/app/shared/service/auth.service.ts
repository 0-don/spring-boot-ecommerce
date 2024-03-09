import { inject, Injectable, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public keycloak = inject(KeycloakService);
  public isAuthenticated = signal<boolean>(false);

  constructor() {
    console.log(1);
    this.isAuthenticated.set(this.keycloak.isLoggedIn());
  }
}
