import PropTypes from 'prop-types';
import ResourceView from './ResourceView.js';
import { withNavigation } from 'react-navigation';
import React, { useState, useEffect } from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceEdit({ formInit, formParser, navigation, ...props }) {
    // Create form state from passed init function.
    const form = useState(formInit());
    const [state, setState] = form;

    // Add merge state function as second param.
    form[1] = (change) => {
        setState({
            ...state,
            ...change,
        })
    };

    // Get item from navigation.
    const item = navigation.getParam('item');

    // Parse item item form on change.
    useEffect(() => {
        if (item) {
            setState(formParser(item));
        }
    }, [item]);

    // Return the resource view.
    return <ResourceView form={form} {...props} />
}

ResourceEdit.propTypes = {
    formInit: PropTypes.func.isRequired,
    formParser: PropTypes.func.isRequired,
    ...ResourceView.propTypes,
}

ResourceEdit.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');
    const getTitle = navigation.getParam('getTitle');

    return {
        title: getTitle ? getTitle(item) : undefined,
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: (
            <HeaderButtons>
                <Item title={item ? 'save' : 'create'} iconName={item ? 'save' : 'plus'} style={{ marginRight: 10 }} onPress={() => {
                    alert('@wip');
                }} />
            </HeaderButtons>
        ),
    };
};

export default withNavigation(ResourceEdit);
