import React from 'react';
import { Layout } from '@ui-kitten/components';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import TransactionItemSettings from '@settings/TransactionItemSettings.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import UPDATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/updateTransactionItem.gql.js';
import CREATE_TRANSACTION_ITEM from '@graphql/mutations/Transaction/Item/createTransactionItem.gql.js';

export default function TransactionItemEditScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={TransactionItemSettings.fields}
                    formInit={TransactionItemSettings.formInit}
                    formParser={TransactionItemSettings.formParser}
                    
                    mutations={{
                        save: UPDATE_TRANSACTION_ITEM,
                        create: CREATE_TRANSACTION_ITEM,
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

TransactionItemEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: TransactionItemSettings.title,
});
