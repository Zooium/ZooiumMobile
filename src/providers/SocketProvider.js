import Settings from '@utils/Settings.js';
import Pusher from 'pusher-js/react-native';
import { useToken } from '@providers/AuthProvider.js';
import React, { useRef, useState, useEffect, useContext, useCallback, createContext } from 'react';

// Create socket holder context.
export const SocketContext = createContext(null);

/**
 * Initializes socket provider instance.
 */
export default function SocketProvider(props) {
    // Define reference for client.
    const client = useRef();

    // Run on settings changes.
    useEffect(() => {
        // Create new Pusher client for settings.
        client.current = new Pusher(Settings.socket.key, Settings.socket);

        // Disconnect from client on cleanup.
        return () => { client.current && client.current.disconnect(); }
    }, []);

    // Returns the context provider with default value.
    return <SocketContext.Provider value={client} {...props} />;
}

/**
 * Returns the socket instance.
 */
export function useSocket() {
    return useContext(SocketContext).current;
}

/**
 * Listen to a passed event and on the channel.
 *
 * @param {Channel} channel
 * @param {string} event
 * @param {closure} callback
 * @param {array} dependencies
 */
export function useEvent(channel, event, callback, dependencies = []) {
    // Create callback holder.
    const ref = useCallback(callback, dependencies);

    // Run on channel, event, or callback change.
    useEffect(() => {
        // Skip if missing channel.
        if (! channel) return;
    
        // Generate event name based on namespace.
        let name = ('App.Events.' + event)
            .split('.')
            .join('\\');

        // Listen to event on channel.
        channel.bind(name, ref);

        // Unbind listener on cleanup.
        return () => { channel.unbind(name, ref); }
    }, [channel, event, ref])
}

/**
 * Connect to a socket channel.
 *
 * @param {string} name 
 */
export function useChannel(name) {
    // Get client and prepare channel holder.
    const client = useSocket();
    const [channel, setChannel] = useState();

    // Run on channel name or client change.
    const token = useToken();
    useEffect(() => {
        // Set client auth settings.
        client.config.auth = {
            headers: {
                Authorization: token.accessToken
                    ? 'Bearer ' + token.accessToken
                    : undefined,
            },
        };

        // Subscribe to channel and save.
        const subscription = client.subscribe(name);
        setChannel(subscription);

        // Unsubscribe from channel on cleanup.
        return () => { client.unsubscribe(name); }
    }, [name, token, client]);

    // Return current channel instance.
    return channel;
}

/**
 * Connects to a private channel.
 *
 * @param {string} name 
 */
export function usePrivateChannel(name) {
    return useChannel('private-'+name);
}
