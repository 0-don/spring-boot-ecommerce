import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8081',
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
