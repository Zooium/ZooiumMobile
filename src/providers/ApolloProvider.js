import React from 'react';
import { ApolloLink } from 'apollo-link';
import Settings from '@utils/Settings.js';
import '@utils/apollo/deepDeleteEntity.js';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import ContextStore from '@utils/ContextStore.js';
import { createUploadLink } from 'apollo-upload-client';
import { CommonActions } from '@react-navigation/native';
import { ApolloProvider as Provider } from '@apollo/react-hooks';
import introspectionQueryResultData from '@graphql/FragmentTypes.json';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

// Create apollo client instance.
export const Client = new ApolloClient({
    cache: new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
            introspectionQueryResultData,
        }),
    }),

    link: ApolloLink.from([
        // Handle unauthorized and mantinance request errors.
        onError(({ networkError: network, graphQLErrors: errors }) => {
            // Get auth and router context.
            let auth = ContextStore.getContext('auth');
            let router = ContextStore.getContext('router');

            // Get the current route name.
            let route = router.state.nav;
            while (route.routes) {
                route = route.routes[route.index];
            }

            // Check if unauthorized error. TODO - differentiate between unauthed and unauthorized.
            const allowsUnauthorized = route && route.params && route.params.allowUnauthorized === true;
            if (errors && errors[0] && errors[0].message == 'Unauthorized' && ! allowsUnauthorized) {
                // TODO - Attempt to refresh token and forward.

                // Logout the user.
                auth.logout();

                // Redirect back to login.
                router.dispatch(
                    CommonActions.navigate({
                        name: 'Login',
                    })
                );
            }

            // Check if back-end is in maintenance mode.
            if (network && network.statusCode && network.statusCode === 503 && route.name !== 'Maintenance') {
                // Redirect to maintenance page.
                router.dispatch(
                    CommonActions.navigate({
                        name: 'Maintenance',
                    })
                );
            }
        }),

        // Add authorization token to requests.
        setContext((_, { headers }) => {
            // Get auth context and find bearer token.
            let auth = ContextStore.getContext('auth');
            const bearer = auth.token && auth.token.accessToken;

            // Return the authorization header.
            return {
                headers: {
                    ...headers,
                    Authorization: bearer ? 'Bearer ' + bearer : undefined,
                }
            }
        }),

        // Allow for file uploads to default query URL.
        createUploadLink({
            uri: Settings.queryUrl,
        }),
    ]),
});

// Export apollo provider.
export default function ApolloProvider(props) {
    return <Provider client={Client} {...props} />;
}
