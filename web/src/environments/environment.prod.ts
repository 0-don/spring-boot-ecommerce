import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://auth.coding.global',
  realm: 'ecommerce',
  clientId: 'angular-client',
};

export const environment = {
  production: false,
  keycloak: {
    ...keycloakConfig,
    clientSecret: 'Ub5P0N3MdvorUa7PJn87ARgMn4WJZCaE',
  },
};
