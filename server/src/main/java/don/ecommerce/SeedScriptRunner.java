package don.ecommerce;

import java.math.BigDecimal;

import don.ecommerce.entity.Product;
import don.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SeedScriptRunner implements ApplicationRunner {

    private final ProductRepository productRepository;

    @Async
    public void run(ApplicationArguments args) throws Exception {
        log.info("Running seed script...");
        seedProducts();
        log.info("Seed script complete");
    }

    public void seedProducts() {
        Faker faker = new Faker();

        for (int i = 0; i < 100; i++) {
            Product product = Product.builder()
                    .name(faker.commerce().productName())
                    .description(faker.lorem().sentence())
                    .price(BigDecimal.valueOf(faker.number().randomNumber(2, true)))
                    .imageUrl(faker.internet().image())
                    .stockQuantity(faker.number().numberBetween(1, 100))
                    .build();
            productRepository.save(product);
        }
    }
}