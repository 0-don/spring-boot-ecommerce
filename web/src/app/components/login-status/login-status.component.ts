import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName?: string;

  storage: Storage = sessionStorage;

  constructor() {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
  }
}
