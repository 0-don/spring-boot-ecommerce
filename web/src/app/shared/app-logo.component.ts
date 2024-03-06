import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  host: {
    class: 'flex items-center justify-center',
  },
  template: `<img alt="logo" src="favicon.ico" width="25px" />`,
})
export class AppLogoComponent {}
