import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'ecommerce',
  clientId: 'angular-client',
};

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  keycloak: { ...keycloakConfig },
};
