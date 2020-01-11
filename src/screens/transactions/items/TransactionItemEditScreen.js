import React from 'react';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import TransactionItemSettings from '@settings/TransactionItemSettings.js';
import UPDATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/updateTransactionItem.gql.js';
import CREATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/createTransactionItem.gql.js';
import DELETE_TRANSACTION_ITEMS from '@graphql/mutations/Transaction/Item/deleteTransactionItems.gql.js';

export default function TransactionItemEditScreen() {
    return (
        <ResourceEdit
            items={TransactionItemSettings.fields}
            formInit={TransactionItemSettings.formInit}
            formParser={TransactionItemSettings.formParser}
            
            mutations={{
                save: UPDATE_TRANSACTION_ITEM,
                create: CREATE_TRANSACTION_ITEM,
                remove: DELETE_TRANSACTION_ITEMS,
            }}
        />
    );
}

TransactionItemEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: TransactionItemSettings.title,
});
