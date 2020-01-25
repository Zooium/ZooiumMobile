import React from 'react';
import i18n from '@src/i18n.js';
import Transaction from '@models/Transaction.model.js';
import ResourceList from '@components/resource/ResourceList.js';
import TransactionRow from '@components/rows/TransactionRow.js';
import LIST_TRANSACTIONS from '@graphql/queries/Transaction/listTransactions.gql.js';
import DELETE_TRANSACTIONS from '@graphql/mutations/Transaction/deleteTransactions.gql.js';

export default function TransactionListScreen({ layout, ...props }) {
    return (
        <ResourceList
            preview={TransactionRow}
            fetch={LIST_TRANSACTIONS}
            title={Transaction.title}
            name={i18n.t('Transaction', { count: 2 })}

            extraData={{
                layout,
            }}
            
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

            {...props}
        />
    );
}

TransactionListScreen.navigationOptions = (props) => ({
    ...ResourceList.navigationOptions(props),
    title: i18n.t('Transaction', { count: 2 }),
});
