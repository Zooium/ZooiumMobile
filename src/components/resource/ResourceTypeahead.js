import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import ResourceList from '@components/resource/ResourceList.js';
import ResourceSelectList from '@components/resource/ResourceSelectList.js';

export default function ResourceTypeahead(props) {
    const Resource = useNavigationParam('list') ?? ResourceList;
    return <Resource List={ResourceSelectList} {...props} />;
}

ResourceTypeahead.navigationOptions = ({ navigation }) => {
    const Resource = navigation.getParam('list') ?? ResourceList;
    return Resource.navigationOptions({ navigation });
}
