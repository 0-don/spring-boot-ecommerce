import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.issuer.split('/oauth2')[0],
      clientId: myAppConfig.clientId,
      redirectUri: myAppConfig.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.issuer,
        scopes: myAppConfig.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      }, // this name should be same as div tag id in login.component.html
      (response: { status: string }) => {
        if (response.status === 'SUCCESS') {
          // @ts-ignore
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
