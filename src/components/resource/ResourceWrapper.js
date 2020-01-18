import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import ResourceView from '@components/resource/ResourceView.js';

export default function ResourceWrapper(props) {
    const Resource = useNavigationParam('editing') ? ResourceEdit : ResourceView;
    return <Resource {...props} />;
}

ResourceWrapper.navigationOptions = ({ navigation, ...props }) => {
    const Resource = navigation.getParam('editing') ? ResourceEdit : ResourceView;
    return Resource.navigationOptions({ navigation, ...props });
}
