import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    SearchComponent,

    CartStatusComponent,

    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
  ],
  imports: [
    AppComponent,
    OrderHistoryComponent,
    ProductListComponent,
    CartDetailsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
  ],
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
