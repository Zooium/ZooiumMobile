import { AuthSession } from 'expo';
import Settings from '@utils/Settings.js';
import ME from '@graphql/queries/me.gql.js';
import AuthState from '@utils/AuthState.js';
import { print } from 'graphql/language/printer';
import AuthChallenge from '@utils/AuthChallenge.js';
import LOGOUT from '@graphql/mutations/Auth/logout.gql.js';

export default class AuthManager {
    static oauth = {
        client_id: Settings.client,
        domain: Settings.authUrl,
        redirect: AuthSession.getRedirectUrl(),
    }

    static async init() {
        // Skip if auth was already loaded.
        if (AuthState.loaded) return false;

        // Load auth state from storage.
        await AuthState.loadState();

        // Refresh the user instance.
        if (! await AuthManager.getUser()) {
            await AuthState.reset();
            return false;
        }

        // Return valid if authenticated.
        return AuthState.isAuthenticated();
    }

    static async authorize() {
        // Clear the current state.
        AuthState.clearState();

        // Generate new PKCE challenge.
        await AuthChallenge.generate();

        // Get authorization code from web.
        let code = await AuthManager.getCode();
        if (! code) return false;

        // Generate token from code.
        let token = await AuthManager.getToken(code);
        if (! token) return false;

        // Fetch the user instance.
        let user = await AuthManager.getUser();
        if (! user) return false;

        // Save state and return success.
        await AuthState.saveState();
        return true;
    }

    static async refresh() {
        // Generate new token from refresh token.
        if (! await AuthManager.getToken(AuthState.refreshToken(), true)) {
            await AuthState.reset();
            return false;
        }

        // Fetch the user instance.
        if (! await AuthManager.fetchAccount()) {
            await AuthState.reset();
            return false;
        }

        // Save state and return success.
        await AuthState.saveState();
        return true;
    }

    static async logout() {
        // Attempt to logout user.
        try {
            await fetch(Settings.queryUrl, {
                method: 'POST',
                body: JSON.stringify({
                    query: print(LOGOUT),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthState.accessToken(),
                },
            });
        } catch { /* Left blank intentionally */ }

        // Delete state from storage and redirect.
        await AuthState.resetAndRedirect();
    }

    static async getUser() {
        // Skip if missing access token.
        if (! AuthState.accessToken()) return false;

        // Attempt to fetch user.
        try {
            // Fetch authenticated user from back-end.
            let { data: { me } } = await (await fetch(Settings.queryUrl, {
                method: 'POST',
                body: JSON.stringify({
                    query: print(ME),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthState.accessToken(),
                },
            })).json();

            // Set and return found user.
            await AuthState.setUser(me);
            return me;
        } catch(e) { return false; }
    }

    static async getCode() {
        try {
            // Request user to authorize login attempt.
            let response = await AuthSession.startAsync({
                authUrl: AuthManager.oauth.domain + '/authorize' +
                    '?response_type=code' +
                    '&code_challenge=' + AuthChallenge.state.challenge +
                    '&code_challenge_method=' + AuthChallenge.settings.crypto_name +
                    '&client_id=' + AuthManager.oauth.client_id +
                    '&redirect_uri=' + encodeURIComponent(AuthManager.oauth.redirect)
            });

            // Return the found response code.
            return response && response.params && response.params.code;
        } catch { return false; }
    }

    static async getToken(code, refresh = false) {
        try {
            // Request token for the passed code.
            let token = await (await fetch(AuthManager.oauth.domain + '/token', {
                method: 'POST',
                body: JSON.stringify({
                    'code': (refresh ? undefined : code),
                    'refresh_token': (refresh ? code : undefined),
                    'grant_type': (refresh ? 'refresh_token' : 'authorization_code'),
                    'client_id': AuthManager.oauth.client_id,
                    'redirect_uri': AuthManager.oauth.redirect,
                    'code_verifier': (refresh ? undefined : AuthChallenge.state.verifier),
                }),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
            })).json();

            // Return out if invalid response.
            if (! token.access_token) return false;

            // Save and return tokens in state.
            AuthState.setToken(token.access_token, token.refresh_token);
            return token;
        } catch { return false; }
    }
}
