import { TestBed } from '@angular/core/testing';

import { CheckoutFormService } from './checkout-form.service';

describe('CheckoutFormService', () => {
  let service: CheckoutFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
