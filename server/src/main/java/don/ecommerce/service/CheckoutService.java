package don.ecommerce.service;

import don.ecommerce.dto.Purchase;
import don.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
