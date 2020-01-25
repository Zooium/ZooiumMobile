import React from 'react';
import useNavigationParam from '@hooks/useNavigationParam.js';
import ResourceList from '@components/resource/ResourceList.js';
import ResourceSelectList from '@components/resource/ResourceSelectList.js';

export default function ResourceTypeahead(props) {
    const Resource = useNavigationParam('list') ?? ResourceList;
    return <Resource List={ResourceSelectList} {...props} />;
}

ResourceTypeahead.navigationOptions = ({ route: { params = {} }, navigation }) => {
    const Resource = params.list ?? ResourceList;
    return Resource.navigationOptions({ navigation });
}
