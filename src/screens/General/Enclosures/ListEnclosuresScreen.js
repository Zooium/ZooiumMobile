import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import EnclosureRow from './components/EnclosureRow.js';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

function ListEnclosuresScreen({ header, layout, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => EnclosureRow({ item, header, navigation, layout });

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_ENCLOSURES}
                    title={EnclosureSettings.title}
                    variables={variables}
                    showRefresh={showRefresh}
                    name={i18n.t('Enclosure', { count: 2 })}

                    deps={{
                        header, layout,
                    }}
                    
                    extraData={{
                        header, layout,
                    }}

                    routes={{
                        view: 'ViewEnclosure',
                        edit: 'EditEnclosure',
                    }}

                    mutations={{
                        remove: DELETE_ENCLOSURES,
                    }}

                    sorting={[
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'name', text: i18n.t('Name') },
                        { key: 'location', text: i18n.t('Location', { count: 1 }) },
                    ]}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ListEnclosuresScreen.navigationOptions = ResourceList.navigationOptions;
ListEnclosuresScreen.propTypes = {
    header: PropTypes.elementType,
    showRefresh: PropTypes.bool,
    variables: PropTypes.object,
    layout: PropTypes.shape({
        showCount: PropTypes.bool,
    }),

    item: PropTypes.object,
}

export default withNavigation(ListEnclosuresScreen);
