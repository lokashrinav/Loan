export function getDiscoveryDocument() {
    return {
        authorizationEndpoint:
            'https://28441449250.propelauthtest.com/propelauth/oauth/authorize',
        tokenEndpoint: 'https://28441449250.propelauthtest.com/propelauth/oauth/token',
        refreshEndpoint:
            'https://28441449250.propelauthtest.com/api/backend/v1/refresh_token',
    };
}