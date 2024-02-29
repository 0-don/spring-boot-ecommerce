package don.ecommerce.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
