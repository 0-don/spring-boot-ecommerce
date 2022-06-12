package don.ecommerce.dto;

import don.ecommerce.entity.Address;
import don.ecommerce.entity.Customer;
import don.ecommerce.entity.Order;
import don.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
