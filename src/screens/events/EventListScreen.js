import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import EventRow from '@components/rows/EventRow.js';
import EventSettings from '@settings/EventSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_EVENTS from '@graphql/queries/Event/listEvents.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

function EventListScreen({ navigation }) {
    const preview = ({ item }) => EventRow({ item, navigation });
    
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_EVENTS}
                    title={EventSettings.title}
                    canModify={EventSettings.canModify}
                    name={i18n.t('Event', { count: 2 })}
                    
                    routes={{
                        view: 'EventView',
                        edit: 'EventEdit',
                    }}

                    mutations={{
                        remove: DELETE_EVENTS,
                    }}

                    sorting={[
                        { key: 'occurred', text: i18n.t('Occurred') },
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'state', text: i18n.t('State') },
                        { key: 'value', text: i18n.t('Value') },
                    ]}
                    
                    defaultSort="occurred"
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

EventListScreen.navigationOptions = ResourceList.navigationOptions;
EventListScreen.propTypes = {
    item: PropTypes.object,
}

export default withNavigation(EventListScreen);
