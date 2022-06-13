import { environment } from 'src/environments/environment';

export default {
  clientId: '0oa5d1w0dvpgYfZhJ5d7',
  issuer: 'https://dev-81445919.okta.com/oauth2/default',
  redirectUri: `${location.protocol + '//' + location.host}/login/callback`,
  scopes: ['openid', 'profile', 'email'],
};
