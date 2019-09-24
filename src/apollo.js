import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import * as SecureStore from 'expo-secure-store';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

// Define request authorization context setter.
const RequestAuthorizer = setContext(async (_, { headers }) => {
    // Get access token from storage. @wip
    let token = await SecureStore.getItemAsync('token');
    let authed = await SecureStore.getItemAsync('user');

    // Add authorization bearer token.
    return {
        headers: {
            ...headers,
            Authorization: authed ? 'Bearer ' + token : undefined,
        }
    }
})

// Define failed request error handler.
const ErrorHandler = onError(({ networkError: network, graphQLErrors: errors }) => {
    // Get the current router route.
    /*let route = router.currentRoute

    // Check if unauthorized error.
    if (errors && errors[0] && errors[0].message == 'Unauthorized' && route.name !== '401') {
        // Attempt to refetch account.
        store.dispatch('account/fetchAccount').then(() => {
            // Redirect to unauthorized page.
            router.push({ name: '401' })
        })
    }

    // Check if in maintenance mode.
    if (network && network.statusCode && network.statusCode === 503 && route.name !== '503') {
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
            uri: 'https://app.zooium.com/graphql',
        }),
    ]),
})
