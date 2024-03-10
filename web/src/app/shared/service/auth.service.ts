import { inject, Injectable, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@/app/shared/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public keycloak = inject(KeycloakService);
  public isAuthenticated = signal<boolean>(false);
  private _http = inject(HttpClient);

  constructor() {
    this.isAuthenticated.set(this.keycloak.isLoggedIn());
  }

  login(username: string, password: string): Observable<Token> {
    const endpoint = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', environment.keycloak.clientId);
    urlencoded.append('username', username);
    urlencoded.append('password', password);
    urlencoded.append('grant_type', 'password');
    return this._http.post<Token>(endpoint, urlencoded, { headers });
  }

  register(username: string, password: string): Observable<any> {
    const endpoint = `${environment.keycloak.url}/admin/realms/${environment.keycloak.realm}/users`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {
      enabled: true,
      attribute: {},
      groups: [],
      email: '',
      emailVerified: '',
      firstName: '',
      lastName: '',
      username,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };

    return this._http.post<any>(endpoint, data, { headers });
  }
}
