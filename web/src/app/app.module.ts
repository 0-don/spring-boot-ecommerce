import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [AppComponent, LoginComponent],
  providers: [
    ProductService,

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // },
  ],
})
export class AppModule {}
