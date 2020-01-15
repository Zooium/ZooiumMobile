import React from 'react';
import TransactionSettings from '@settings/TransactionSettings.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import VIEW_TRANSACTION from '@graphql/queries/Transaction/viewTransaction.gql.js';
import UPDATE_TRANSACTION from '@graphql/mutations/Transaction/updateTransaction.gql.js';
import CREATE_TRANSACTION from '@graphql/mutations/Transaction/createTransaction.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

export default function TransactionViewScreen(props) {
    return (
        <ResourceWrapper
            items={TransactionSettings.fields}
            parser={TransactionSettings.parser}
            headers={TransactionSettings.headers}
            formInit={TransactionSettings.formInit}

            fetch={VIEW_TRANSACTION}
            mutations={{
                save: UPDATE_TRANSACTION,
                create: CREATE_TRANSACTION,
                remove: DELETE_TRANSACTIONS,
            }}
                
            routes={{
                view: 'TransactionView',
                edit: 'TransactionEdit',
            }}

            {...props}
        />
    );
}

TransactionViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: TransactionSettings.title,
});
