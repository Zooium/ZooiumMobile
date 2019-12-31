import React from 'react';
import { Input, styled } from '@ui-kitten/components';

function MultilineInput({ numberOfLines = 4, textStyle, themedStyle, ...props }) {
    // Calculate input minimum height.
    const minHeight = (numberOfLines * themedStyle.textFontSize) + (themedStyle.paddingVertical * 2);

    // Return the input component.
    return <Input multiline={true} textStyle={[textStyle, { minHeight }]} {...props} />;
}

MultilineInput.styledComponentName = 'Input';
export default styled(MultilineInput);
