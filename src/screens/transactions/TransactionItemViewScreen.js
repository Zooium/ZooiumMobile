import React from 'react';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import TransactionItemSettings from '@settings/TransactionItemSettings.js';
import UPDATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/updateTransactionItem.gql.js';
import CREATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/createTransactionItem.gql.js';
import DELETE_TRANSACTION_ITEMS from '@graphql/mutations/Transaction/Item/deleteTransactionItems.gql.js';

export default function TransactionItemViewScreen(props) {
    return (
        <ResourceWrapper
            items={TransactionItemSettings.fields}
            parser={TransactionItemSettings.parser}
            formInit={TransactionItemSettings.formInit}
            
            mutations={{
                save: UPDATE_TRANSACTION_ITEM,
                create: CREATE_TRANSACTION_ITEM,
                remove: DELETE_TRANSACTION_ITEMS,
            }}

            {...props}
        />
    );
}

TransactionItemViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: TransactionItemSettings.title,
});
