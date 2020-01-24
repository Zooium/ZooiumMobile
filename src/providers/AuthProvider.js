import * as AppAuth from 'expo-app-auth';
import Settings from '@utils/Settings.js';
import ME from '@graphql/queries/me.gql.js';
import * as SecureStore from 'expo-secure-store';
import ContextStore from '@utils/ContextStore.js';
import { useLazyQuery } from '@apollo/react-hooks';
import React, { useMemo, useState, useEffect, useCallback, useContext, createContext } from 'react';

// Define auth secure storage key.
export const AUTH_STORAGE = 'APP-AUTH';

// Create authentication holder context.
export const AuthContext = createContext(null);

/**
 * Initializes auth provider instance.
 */
export default function AuthProvider(props) {
    // Define auth states. 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(undefined);

    // Prepare lazy me query skipping cache.
    const [loadUser, { error, data }] = useLazyQuery(ME, {
        fetchPolicy: 'network-only',
    });

    // Define login action.
    const login = useCallback(async () => {
        try {
            // Enable loading and attempt to auth user.
            setLoading(true);
            const newToken = await AppAuth.authAsync(Settings.auth);

            // Save new token and load user.
            setToken(newToken);
            loadUser();
        } catch (error) {
            // Unset token and disable loading.
            setToken(undefined);
            setLoading(false);
        }
    }, [setLoading, setToken, loadUser]);

    // Define logout action.
    const logout = useCallback(() => {
        // TODO Attempt to revoke token if set.
        /*if (token && token.accessToken) {
            try {
                AppAuth.revokeAsync(Settings.auth, {
                    token: token.accessToken,
                });
            } catch {}
        }*/

        // Unset token and user.
        setUser(undefined);
        setToken(undefined);
    }, [setUser, setToken]);

    // Set user state when me query resolves. 
    useEffect(() => {
        if (data) {
            setUser(data && data.me);
            setLoading(false);
        }
    }, [data, setUser, setLoading]);

    // Logout user on failed me query resolve.
    useEffect(() => {
        if (error) {
            logout();
            setLoading(false);
        }
    }, [error, logout, setLoading]);

    // Manage token in storage on change. 
    useEffect(() => {
        if (token) {
            // Save new token info to storage.
            SecureStore.setItemAsync(AUTH_STORAGE, JSON.stringify(token));
        } else {
            // Delete existing token info from storage.
            SecureStore.deleteItemAsync(AUTH_STORAGE);
        }
    }, [token]);

    // Load saved token on boot.
    useEffect(() => {
        // TODO Double check implementation, may reach byte limit?
        (async () => {
            // Get stored token from storage and save.
            const stored = await SecureStore.getItemAsync(AUTH_STORAGE);
            setToken(JSON.parse(stored) || undefined);

            // Request user if has token or disable loading.
            if (stored) {
                loadUser();
            } else {
                setLoading(false);
            }
        })();
    }, [setToken, setLoading, loadUser]);

    // Calculate context exports.
    const value = useMemo(() => ({
        loading, token, user, login, logout,
    }), [loading, token, user, login, logout]);

    // Save context instance to store. 
    ContextStore.saveContext('auth', value);

    // Returns the context provider with default value.
    return <AuthContext.Provider value={value} {...props} />;
}

/**
 * Returns the auth context.
 */
export function useAuth() {
    return useContext(AuthContext);
}

/**
 * Returns the auth loading state.
 */
export function useLoading() {
    return useAuth().loading;
}

/**
 * Returns the auth token.
 */
export function useToken() {
    return useAuth().token;
}

/**
 * Returns the auth user.
 */
export function useUser() {
    return useAuth().user;
}

/**
 * Returns the authed status.
 */
export function useAuthed() {
    const user = useUser();
    const token = useToken();
    return user && token;
}

/**
 * Returns the auth user team.
 */
export function useTeam() {
    const user = useUser();
    return user && user.team;
}

/**
 * Returns the auth login trugger.
 */
export function useLogin() {
    return useAuth().login;
}

/**
 * Returns the auth logout trugger.
 */
export function useLogout() {
    return useAuth().logout;
}
