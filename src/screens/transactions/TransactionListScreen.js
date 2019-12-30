import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import ResourceList from '@components/resource/ResourceList.js';
import TransactionRow from '@components/rows/TransactionRow.js';
import TransactionSettings from '@settings/TransactionSettings.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import LIST_TRANSACTIONS from '@graphql/queries/Transaction/listTransactions.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

function TransactionListScreen({ layout, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => TransactionRow({ item, navigation, layout });

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_TRANSACTIONS}
                    title={TransactionSettings.title}
                    variables={variables}
                    showRefresh={showRefresh}
                    name={i18n.t('Transaction', { count: 2 })}
                    
                    routes={{
                        view: 'TransactionView',
                        edit: 'TransactionEdit',
                    }}

                    mutations={{
                        remove: DELETE_TRANSACTIONS,
                    }}

                    sorting={[
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'occurred', text: i18n.t('Date') },
                        { key: 'name', text: i18n.t('Name') },
                    ]}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

TransactionListScreen.navigationOptions = ResourceList.navigationOptions;
TransactionListScreen.propTypes = {
    showRefresh: PropTypes.bool,
    variables: PropTypes.object,
    layout: PropTypes.shape({
        showCount: PropTypes.bool,
    }),

    item: PropTypes.object,
}

export default withNavigation(TransactionListScreen);