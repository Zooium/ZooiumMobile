import React from 'react';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import TransactionSettings from '@settings/TransactionSettings.js';
import VIEW_TRANSACTION from '@graphql/queries/Transaction/viewTransaction.gql.js';
import UPDATE_TRANSACTION from '@graphql/mutations/Transaction/updateTransaction.gql.js';
import CREATE_TRANSACTION from '@graphql/mutations/Transaction/createTransaction.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

export default function TransactionEditScreen() {
    return (
        <ResourceEdit
            items={TransactionSettings.fields}
            formInit={TransactionSettings.formInit}
            formParser={TransactionSettings.formParser}
            
            fetch={VIEW_TRANSACTION}
            mutations={{
                save: UPDATE_TRANSACTION,
                create: CREATE_TRANSACTION,
                remove: DELETE_TRANSACTIONS,
            }}

            routes={{
                view: 'TransactionView',
            }}
        />
    );
}

TransactionEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: TransactionSettings.title,
});
