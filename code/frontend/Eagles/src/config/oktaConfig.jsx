/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const REACT_APP_PORT = process.env.REACT_APP_PORT;

export const oktaConfig = {
    cilentId: `${REACT_APP_CLIENT_ID}`,
    issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `http://localhost:${REACT_APP_PORT}/login/callback`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};