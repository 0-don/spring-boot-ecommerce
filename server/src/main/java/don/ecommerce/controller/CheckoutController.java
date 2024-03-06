package don.ecommerce.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class CheckoutController {

    @GetMapping("demo1")
    public ResponseEntity<String> demo1() {
        return new ResponseEntity<>("demo1", HttpStatus.OK);
    }

    @PostMapping("demo2")
    public ResponseEntity<String> demo2() {
        return new ResponseEntity<>("demo2", HttpStatus.OK);
    }

}









