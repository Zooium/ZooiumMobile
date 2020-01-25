import React from 'react';
import useNavigationParam from '@hooks/useNavigationParam.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import ResourceView from '@components/resource/ResourceView.js';

export default function ResourceWrapper(props) {
    const Resource = useNavigationParam('editing') ? ResourceEdit : ResourceView;
    return <Resource {...props} />;
}

ResourceWrapper.navigationOptions = ({ route: { params = {} }, ...props }) => {
    const Resource = params.editing ? ResourceEdit : ResourceView;
    return Resource.navigationOptions(props);
}
