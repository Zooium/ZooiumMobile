import React from 'react';
import { withNavigation } from 'react-navigation';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import ResourceView from '@components/resource/ResourceView.js';

function ResourceWrapper({ navigation, ...props }) {
    const Resource = navigation.getParam('editing') ? ResourceEdit : ResourceView;
    return <Resource {...props} />;
}

ResourceWrapper.navigationOptions = ({ navigation, ...props }) => {
    const Resource = navigation.getParam('editing') ? ResourceEdit : ResourceView;
    return Resource.navigationOptions({ navigation, ...props });
}

export default withNavigation(ResourceWrapper);
