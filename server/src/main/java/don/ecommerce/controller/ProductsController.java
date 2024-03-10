package don.ecommerce.controller;

import don.ecommerce.config.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/products")
@RequiredArgsConstructor
public class ProductsController {

    @GetMapping("demo1")
    @Secured(Role.ROLE_USER)
    public ResponseEntity<String> demo1() {
        return new ResponseEntity<>("demo1", HttpStatus.OK);
    }

    @GetMapping("demo2")
    @Secured(Role.ROLE_ADMIN)
    public ResponseEntity<String> demo2() {
        return new ResponseEntity<>("demo2", HttpStatus.OK);
    }

}









