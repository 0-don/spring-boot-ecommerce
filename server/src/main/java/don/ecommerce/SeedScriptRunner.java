package don.ecommerce;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SeedScriptRunner implements ApplicationRunner {

    @Async
    public void run(ApplicationArguments args) throws Exception {
        // Your seed script logic here
        log.info("Running seed script...");
        // Simulate some seed script work
        Thread.sleep(500000); // Just for demonstration, remove in real code
        log.info("Seed script complete");
    }
}