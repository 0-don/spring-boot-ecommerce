import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: any = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthStateService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      // @ts-ignore
      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    // @ts-ignore
    this.oktaAuthService.signOut();
  }
}
