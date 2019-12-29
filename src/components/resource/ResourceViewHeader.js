import React from 'react';
import AppStyles from '@utils/AppStyles.js';
import { Text } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

function ResourceViewHeader({ section, render = 'View' }) {
    // Skip if header has render condition and not valid.
    if (section.shouldRender && ! section.shouldRender(render.toLowerCase())) {
        return null;
    }

    // Return the header title.
    return (
        <Text category="label" style={AppStyles.listSection}>
            {section.title.toUpperCase()}
        </Text>
    );
}

export default withNavigation(ResourceViewHeader);
