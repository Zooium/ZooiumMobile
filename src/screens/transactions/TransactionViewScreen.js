import React from 'react';
import ResourceView from '@components/resource/ResourceView.js';
import TransactionSettings from '@settings/TransactionSettings.js';
import VIEW_TRANSACTION from '@graphql/queries/Transaction/viewTransaction.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

export default function TransactionViewScreen() {
    return (
        <ResourceView
            items={TransactionSettings.fields}
            parser={TransactionSettings.parser}
            headers={TransactionSettings.headers}
            fetch={VIEW_TRANSACTION}

            mutations={{
                remove: DELETE_TRANSACTIONS,
            }}
                
            routes={{
                edit: 'TransactionEdit',
            }}
        />
    );
}

TransactionViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: TransactionSettings.title,
});
