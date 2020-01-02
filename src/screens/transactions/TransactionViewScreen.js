import React from 'react';
import { Layout } from '@ui-kitten/components';
import ResourceView from '@components/resource/ResourceView.js';
import TransactionSettings from '@settings/TransactionSettings.js';
import VIEW_TRANSACTION from '@graphql/queries/Transaction/viewTransaction.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

export default function TransactionViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={TransactionSettings.fields}
                headers={TransactionSettings.headers}
                fetch={VIEW_TRANSACTION}

                mutations={{
                    remove: DELETE_TRANSACTIONS,
                }}
                    
                routes={{
                    edit: 'TransactionEdit',
                }}
            />
        </Layout>
    )
}

TransactionViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: TransactionSettings.title,
});
