import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [],
  imports: [AppComponent],
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
