package don.ecommerce.config;


import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter =
            new JwtGrantedAuthoritiesConverter();


    @Value("${jwt.auth.converter.principle-attribute}")
    private String principleAttribute;

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
        try {
            Collection<GrantedAuthority> grantedAuthorities =
                    jwtGrantedAuthoritiesConverter.convert(jwt);
            var resourceRoles = extractResourceRoles(jwt);
            String username = jwt.getClaim(principleAttribute);

            Collection<GrantedAuthority> authorities = Stream.concat(
                    grantedAuthorities.stream(),
                    resourceRoles.stream()
            ).collect(Collectors.toSet());

            return new JwtAuthenticationToken(jwt, authorities, username);
        } catch (Exception e) {
            log.error("Error converting JWT", e);
            throw e;
        }
    }


    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        if (jwt.getClaim("resource_access") instanceof Map<?, ?> resourceAccess) {
            if (resourceAccess.get("account") instanceof Map<?, ?> resource) {
                if (resource.get("roles") instanceof Collection<?> roles) {
                    return roles.stream()
                            .filter(String.class::isInstance)
                            .map(String.class::cast)
                            .map((r) -> new SimpleGrantedAuthority("ROLE_" + r))
                            .collect(Collectors.toSet());
                }
                log.warn("No roles key found in the resource access" + resource);
                return Collections.emptySet();
            }
            log.warn("No account key found in the resource access" + resourceAccess);
            return Collections.emptySet();
        }
        log.warn("No resource access found in the JWT" + jwt.getClaims());
        return Collections.emptySet();
    }
}