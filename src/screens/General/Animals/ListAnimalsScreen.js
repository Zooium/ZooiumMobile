import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Layout } from '@ui-kitten/components';
import AnimalRow from './components/AnimalRow.js';
import { withNavigation } from 'react-navigation';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

function ListAnimalsScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={AnimalRow}
                    fetch={LIST_ANIMALS}
                    name={i18n.t('Animal', { count: 2 })}
                    title={AnimalSettings.title}
                    
                    routes={{
                        view: 'ViewAnimal',
                        edit: 'EditAnimal',
                    }}

                    mutations={{
                        remove: DELETE_ANIMALS,
                    }}

                    filters={[
                        { key: 'active', text: i18n.t('Active') },
                        { key: 'sold', text: i18n.t('Sold') },
                        { key: 'deceased', text: i18n.t('Deceased') },
                    ]}

                    sorting={[
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'identifier', text: i18n.t('ID') },
                        { key: 'name', text: i18n.t('Name') },
                        { key: 'specie', text: i18n.t('Specie', { count: 1 }) },
                        { key: 'enclosure', text: i18n.t('Enclosure', { count: 1 }) },
                    ]}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ListAnimalsScreen.navigationOptions = ResourceList.navigationOptions;
ListAnimalsScreen.propTypes = {
    item: PropTypes.object,
}

export default withNavigation(ListAnimalsScreen);
