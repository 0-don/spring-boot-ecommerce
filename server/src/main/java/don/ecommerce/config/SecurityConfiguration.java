package don.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // protect endpoint /api/orders
//        http.authorizeRequests()
//                .antMatchers("/api/orders/**")
//                .authenticated();
        // add CORS filters
        http.cors();

        // force a non-empty response body for 401's to make the response more friendly
//        Okta.configureResourceServer401ResponseBody(http);

        http.csrf().disable();
    }
}
