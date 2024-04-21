export function getDiscoveryDocument() {
    return {
        authorizationEndpoint:
            process.env.EXPO_PUBLIC_BASE_AUTH_URL + '/propelauth/oauth/authorize',
        tokenEndpoint: process.env.EXPO_PUBLIC_BASE_AUTH_URL + '/propelauth/oauth/token',
        refreshEndpoint:
            process.env.EXPO_PUBLIC_BASE_AUTH_URL + '/api/backend/v1/refresh_token',
    };
}