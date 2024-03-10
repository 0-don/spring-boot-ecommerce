import { inject, Injectable, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakOptions } from 'keycloak-angular/lib/core/interfaces/keycloak-options';
import { KeycloakConfig } from 'keycloak-js';
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

  static init(options?: KeycloakOptions): KeycloakOptions {
    const baseConfig: KeycloakConfig = {
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    };

    return {
      ...options,
      config: {
        ...baseConfig,
        ...(options?.config as KeycloakConfig),
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        ...options?.initOptions,
      },
    };
  }

  login(username: string, password: string): Observable<Token> {
    const tokenEndpoint = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', environment.keycloak.clientId);
    urlencoded.append('client_secret', environment.keycloak.clientSecret);
    urlencoded.append('username', username);
    urlencoded.append('password', password);
    urlencoded.append('grant_type', 'password');
    return this._http.post<Token>(tokenEndpoint, urlencoded, { headers });
  }
}
