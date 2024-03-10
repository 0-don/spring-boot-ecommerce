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
    clientSecret: '04UEM5qOh2p4UA3VoDaat1WFsjs15Gp6',
  },
};
