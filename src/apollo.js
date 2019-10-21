import { ApolloLink } from 'apollo-link';
import Settings from '@utils/Settings.js';
import AuthState from '@utils/AuthState.js';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import AuthManager from '@utils/AuthManager.js';
import { setContext } from 'apollo-link-context';
import { NavigationActions } from 'react-navigation';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import NavigationService from '@utils/NavigationService.js';

// Define request authorization context setter.
const RequestAuthorizer = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: AuthState.accessToken()
                ? 'Bearer ' + AuthState.accessToken()
                : undefined,
        }
    }
})

// Define failed request error handler.
const ErrorHandler = onError(({ networkError: network, graphQLErrors: errors, forward, operation }) => {
    // Get the current route name.
    let route = NavigationService.currentRoute().routeName;
    
    // Check if unauthorized error. @wip - differentiate between unauthed and unauthorized.
    if (errors && errors[0] && errors[0].message == 'Unauthorized' && route !== 'Login') {
        // Attempt to refresh auth and retry.
        AuthManager.refresh().then(result => {
            // Retry the operation if refeshed.
            if (result) return forward(operation);
        }).finally(() => {
            // Delete auth state and redirect.
        AuthState.resetAndRedirect();
            router.push({ name: 'login' });
        });
    }

    // @wip - Check if in maintenance mode.
    /*if (network && network.statusCode && network.statusCode === 503 && route.name !== '503') {
        // Redirect to maintenance page.
        router.push({ name: '503' })
    }*/
})

// Export the appollo client instance.
export default new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        ErrorHandler,
        RequestAuthorizer,

        createUploadLink({
            uri: Settings.queryUrl,
        }),
    ]),
})
