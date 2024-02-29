import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor() {}

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      }, // this name should be same as div tag id in login.component.html
      (response: { status: string }) => {},
      (error: any) => {
        throw error;
      }
    );
  }
}
