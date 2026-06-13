import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://auth.coding-global.com',
  realm: 'ecommerce',
  clientId: 'angular-client',
};

export const environment = {
  production: false,
  apiUrl: 'https://ecommerce.coding-global.com',
  keycloak: { ...keycloakConfig },
};
