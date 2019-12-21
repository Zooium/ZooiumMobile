import React from 'react';
import { Linking } from 'expo';
import theme from '@src/theme.js';
import i18n, { localeName } from '@src/i18n.js';
import SexPreview from './components/SexPreview.js';
import CitesListing from './components/CitesListing.js';
import AnimalSettings from '@settings/AnimalSettings.js';
import SpecieSettings from '@settings/SpecieSettings.js';
import { Text, Icon, Layout } from '@ui-kitten/components';
import { View, Alert, TouchableOpacity } from 'react-native';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';

export default function ViewAnimalScreen({ navigation }) {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={AnimalSettings.fields}
                fetch={VIEW_ANIMAL}
                    
                routes={{
                    edit: 'EditAnimal',
                }}
            />
        </Layout>
    )
}

ViewAnimalScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: AnimalSettings.title,
});
