import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../common/country';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { PaymentInfo } from '../../common/payment-info';
import { Purchase } from '../../common/purchase';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutValidators } from '../../validators/checkout-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup = new UntypedFormGroup({});

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  storage: Storage = sessionStorage;

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';

  isDisabled: boolean = false;

  userEmail: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private checkoutFormService: CheckoutFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupStripePaymentForm();

    this.reviewCartDetails();

    const userStorageEmail = this.storage.getItem('userEmail');
    if (userStorageEmail) {
      this.userEmail = JSON.parse(userStorageEmail);
    }

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),

        lastName: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),

        email: new UntypedFormControl(this.userEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
        city: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
        state: new UntypedFormControl('', [Validators.required]),
        country: new UntypedFormControl('', [Validators.required]),
        zipCode: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
        city: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
        state: new UntypedFormControl('', [Validators.required]),
        country: new UntypedFormControl('', [Validators.required]),
        zipCode: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(2),
          CheckoutValidators.notOnlyWhitespace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        // cardType: new FormControl('', [Validators.required]),
        // nameOnCard: new FormControl('', [
        //   Validators.required,
        //   Validators.minLength(2),
        //   CheckoutValidators.notOnlyWhitespace,
        // ]),
        // cardNumber: new FormControl('', [
        //   Validators.required,
        //   Validators.pattern('[0-9]{16}'),
        // ]),
        // securityCode: new FormControl('', [
        //   Validators.required,
        //   Validators.pattern('[0-9]{3}'),
        // ]),
        // expirationMonth: [''],
        // expirationYear: [''],
      }),
    });
    // const startMonth: number = new Date().getMonth() + 1;

    // this.checkoutFormService
    //   .getCreditCardMonths(startMonth)
    //   .subscribe((data: number[]) => (this.creditCardMonths = data));

    this.checkoutFormService
      .getCreditCardYears()
      .subscribe((data: number[]) => (this.creditCardYears = data));

    this.checkoutFormService
      .getCountries()
      .subscribe((data: Country[]) => (this.countries = data));
  }

  setupStripePaymentForm() {
    this.cardElement.mount('#card-element');

    this.cardElement.on(
      'change',
      (event: { complete: any; error: { message: any } }) => {
        this.displayError = document.getElementById('card-errors');

        if (event.complete) {
          this.displayError.textContent = '';
        } else if (event.error) {
          this.displayError.textContent = event.error.message;
        }
      }
    );
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(
      (tempCartItem) => new OrderItem(tempCartItem)
    );

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress =
      this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress =
      this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = 'USD';
    this.paymentInfo.receiptEmail = purchase.customer.email;

    // if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (
      !this.checkoutFormGroup.invalid &&
      this.displayError.textContent === ''
    ) {
      this.isDisabled = true;

      this.checkoutService
        .createPaymentIntent(this.paymentInfo)
        .subscribe((paymentIntentResponse) => {});
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl('/products');
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data: number[]) => (this.creditCardMonths = data));
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.checkoutFormService
      .getStates(countryCode)
      .subscribe((data: State[]) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]);
      });
  }
}
