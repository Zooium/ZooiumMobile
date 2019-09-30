import React from 'react';
import { Button } from 'react-native-ui-kitten';
import { ActivityIndicator } from 'react-native';

export default function LoadingButton(props) {
    // Create list for extra props.
    let extraProps = {};

    // Disable when loading.
    extraProps.disabled = props.loading;

    // Show icon when loading.
    extraProps.icon = props.loading
        ? () => <ActivityIndicator size={props.size === 'giant' ? 'large' : 'small'} />
        : undefined;

    // Return button with props.
    return (
        <Button {...props} {...extraProps}>
            {props.loading ? undefined : props.children }
        </Button>
    );
}
