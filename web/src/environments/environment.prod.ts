import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://auth.coding.global',
  realm: 'ecommerce',
  clientId: 'angular-client',
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
};
