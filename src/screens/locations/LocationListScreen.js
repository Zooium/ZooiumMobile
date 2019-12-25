import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import LocationRow from '@components/rows/LocationRow.js';
import LocationSettings from '@settings/LocationSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import LIST_LOCATIONS from '@graphql/queries/Location/listLocations.gql.js';
import DELETE_LOCATIONS from '@graphql/mutations/Location/deleteLocations.gql.js';

function LocationListScreen({ layout, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => LocationRow({ item, navigation, layout });

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_LOCATIONS}
                    title={LocationSettings.title}
                    variables={variables}
                    showRefresh={showRefresh}
                    name={i18n.t('Location', { count: 2 })}
                    
                    routes={{
                        view: 'LocationView',
                        edit: 'LocationEdit',
                    }}

                    mutations={{
                        remove: DELETE_LOCATIONS,
                    }}

                    sorting={[
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'name', text: i18n.t('Name') },
                        { key: 'address', text: i18n.t('Address') },
                    ]}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

LocationListScreen.navigationOptions = ResourceList.navigationOptions;
LocationListScreen.propTypes = {
    showRefresh: PropTypes.bool,
    variables: PropTypes.object,
    layout: PropTypes.shape({
        showCount: PropTypes.bool,
    }),

    item: PropTypes.object,
}

export default withNavigation(LocationListScreen);
