import * as SecureStore from 'expo-secure-store';
import { NavigationActions } from 'react-navigation';
import NavigationService from '@utils/NavigationService.js';

export default class AuthState {
    static loaded = false;

    static state = {
        user: null,
        token: {
            access: null,
            refresh: null,
        },
    }

    static setUser(user) {
        AuthState.state.user = user || null;
    }

    static setToken(accessToken, refreshToken) {
        AuthState.state.token.access = accessToken || null;
        AuthState.state.token.refresh = refreshToken || null;
    }

    static async loadState() {
        let access = await SecureStore.getItemAsync('auth_access_token');
        let refresh = await SecureStore.getItemAsync('auth_refresh_token');

        AuthState.loaded = true;
        return AuthState.setToken(access, refresh);
    }

    static async saveState() {
        if (! AuthState.accessToken() || ! AuthState.refreshToken()) {
            return AuthState.deleteState();
        }
            
        await SecureStore.setItemAsync('auth_access_token', AuthState.accessToken());
        await SecureStore.setItemAsync('auth_refresh_token', AuthState.refreshToken());
    }

    static async deleteState() {
        await SecureStore.deleteItemAsync('auth_access_token');
        await SecureStore.deleteItemAsync('auth_refresh_token');
    }

    static clearState() {
        AuthState.state = {
            user: null,
            token: {
                access: null,
                refresh: null,
            },
        };   
    }

    static async reset() {
        await AuthState.deleteState();
        AuthState.clearState();
    }

    static async resetAndRedirect() {
        await AuthState.reset();

        NavigationService.navigate({
            routeName: 'Auth',
            action: NavigationActions.navigate({
                routeName: 'Login',
            }),
        });
    }

    static user() {
        return AuthState.state.user;
    }

    static currentTeam() {
        return AuthState.user() && AuthState.user().team;
    }

    static currentTeamID() {
        return AuthState.currentTeam() && AuthState.currentTeam().id;
    }

    static accessToken() {
        return AuthState.state.token.access;
    }

    static refreshToken() {
        return AuthState.state.token.refresh;
    }

    static isAuthenticated() {
        return AuthState.user() != null && AuthState.accessToken() != null;
    }
}
