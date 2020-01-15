import React from 'react';
import Loader from '@components/Loader.js';
import { styled, Button } from '@ui-kitten/components';

function LoadingButton({ size = 'medium', loading, children, themedStyle, ...props }) {
    return (
        <Button size={size} icon={loading && (() => (
            <Loader style={{ width: '100%', height: themedStyle.textLineHeight }} />
        ))} {...props}>
            {! loading && children }
        </Button>
    );
}

LoadingButton.styledComponentName = 'Button';
export default styled(LoadingButton);
