import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import ContactRow from '@components/rows/ContactRow.js';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_CONTACTS from '@graphql/queries/Contact/listContacts.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

function ContactListScreen({ layout, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => ContactRow({ item, navigation, layout });

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_CONTACTS}
                    title={ContactSettings.title}
                    variables={variables}
                    showRefresh={showRefresh}
                    name={i18n.t('Contact', { count: 2 })}
                    
                    routes={{
                        view: 'ContactView',
                        edit: 'ContactEdit',
                    }}

                    mutations={{
                        remove: DELETE_CONTACTS,
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

ContactListScreen.navigationOptions = ResourceList.navigationOptions;
ContactListScreen.propTypes = {
    showRefresh: PropTypes.bool,
    variables: PropTypes.object,
    layout: PropTypes.shape({
        showCount: PropTypes.bool,
    }),

    item: PropTypes.object,
}

export default withNavigation(ContactListScreen);
