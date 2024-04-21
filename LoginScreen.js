import { getDiscoveryDocument } from './DiscoveryDocument';
import * as AuthSession from 'expo-auth-session';

const discoveryDocument = getDiscoveryDocument();
const [request, response, promptAsync] = useAuthRequest(
    {
        clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
        redirectUri: AuthSession.makeRedirectUri(),
        usePKCE: true,
    },
    discoveryDocument,
);

useEffect(() => {
    if (response?.type === 'success' && response.params.code && request?.codeVerifier) {
        const getToken = async () => {
            const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
                {
                    clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
                    code: response.params.code,
                    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
                    extraParams: {
                        code_verifier: request.codeVerifier ?? '',
                    },
                },
                discoveryDocument,
            );
            saveValueToSecureStore('access_token', exchangeTokenResponse.accessToken);
            saveValueToSecureStore('refresh_token', exchangeTokenResponse.refreshToken);
        };
        getToken();
    }
}, [response]);

<Button disabled={!request} title="Login" onPress={() => promptAsync()} />

