package don.ecommerce.controller;

import don.ecommerce.dto.PaymentInfo;
import don.ecommerce.dto.Purchase;
import don.ecommerce.dto.PurchaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {


    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        return PurchaseResponse.builder()
                .orderTrackingNumber("ABC123")
                .build();
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) {

        return new ResponseEntity<>("paymentStr", HttpStatus.OK);
    }

}









