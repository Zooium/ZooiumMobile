import React from 'react';
import { styled, Button } from '@ui-kitten/components';

function InputButton({ themedStyle, ...props }) {
    // Parse the passed props.
    const parsedProps = props;
    parsedProps['appearance'] = 'filled';

    // Extract text styles from theme.
    const textStyles = {};
    Object.keys(themedStyle).forEach(key => {
        // Skip if not text style.
        if (! key.match(/^text/)) return;

        // Remove text prefix and lowercase first char.
        const newKey = key.replace(/^text(.)/, (_match, firstChar) => {
            return firstChar.toLowerCase();
        });

        // Add style to text styles.
        textStyles[newKey] = themedStyle[key];
    });

    // Line height is not applied by UI library and TextInput seem to have some arbitrary line height.
    // @see https://github.com/akveo/react-native-ui-kitten/blob/fd63d7bb23b2087272ecbf0e608293ba1601418b/src/components/ui/input/input.component.tsx#L227
    textStyles.lineHeight = 27.6;

    // Return button styled as input.
    return (
        <Button status="basic" appearance="outline" style={[themedStyle, {
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
        }]} textStyle={[textStyles, {
            flex: 1,
        }]} {...parsedProps}>
            {props.children || ' '}
        </Button>
    );
}

InputButton.styledComponentName = 'Input';
export default styled(InputButton);
