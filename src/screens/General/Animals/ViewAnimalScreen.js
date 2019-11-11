import React from 'react';
import { Linking } from 'expo';
import theme from '@src/theme.js';
import i18n, { localeName } from '@src/i18n.js';
import SexPreview from './components/SexPreview.js';
import CitesListing from './components/CitesListing.js';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Text, Icon, Layout } from 'react-native-ui-kitten';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';

export default function ViewAnimalScreen({ navigation }) {
    const items = [
        {
            title: i18n.t('General'),
            data: [
                {
                    title: i18n.t('ID'),
                    text: resource => resource.identifier,
                },
                {
                    title: i18n.t('Name'),
                    text: resource => resource.name,
                },
                {
                    title: i18n.t('Enclosure', { count: 1 }),
                    provided: resource => resource.enclosure,
                    render: resource => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate({
                                routeName: 'ViewEnclosure',
                                params: {
                                    item: resource.enclosure,
                                },
                            })
                        }}>
                            <Text status="primary">{resource.enclosure.name}</Text>
                        </TouchableOpacity>
                    ),
                },
                {
                    title: i18n.t('Specie', { count: 1 }),
                    provided: resource => resource.specie,
                    render: resource => (
                        <View>
                            <Text>
                                {resource.specie[localeName()] || resource.specie.english_name || resource.specie.scientific}
                            </Text>

                            <Text category="c1" appearance="hint">
                                {resource.specie.scientific}
                            </Text>
                        </View>
                    ),
                },
                {
                    title: () => (
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} onPress={() => {
                            Alert.alert(i18n.t('Disclaimer'), i18n.t('cites.disclaimer'));
                        }}>
                            <Text category="s2" appearance="hint" style={{ marginRight: 4 }}>
                                CITES
                            </Text>

                            <Icon size={12} name="question-circle" color={theme['color-primary-500']} />
                        </TouchableOpacity>
                    ),
                    render: resource => {
                        const cites = resource.cites || resource.specie && resource.specie.cites;
                        
                        const readMoreAddress = cites
                            ? `https://speciesplus.net/species#/taxon_concepts/${cites.source_id}/legal`
                            : `https://speciesplus.net/species#/taxon_concepts?taxonomy=cites_eu&taxon_concept_query=${encodeURI(resource.specie && resource.specie.scientific)}&geo_entity_scope=cites&page=1`;

                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {cites && cites.listing.split('/').map((value) => {
                                    return <CitesListing key={value} listing={value} />;
                                })}

                                {resource.specie &&
                                    <TouchableOpacity style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        marginLeft: cites ? 8 : 0,
                                    }} onPress={() => {
                                        Linking.openURL(readMoreAddress);
                                    }}>
                                        <Text status="primary" style={{ marginRight: 4 }}>
                                            {i18n.t('Read more')}
                                        </Text>
                                    </TouchableOpacity>
                                || <Text>{i18n.t('Unavailable')}</Text>}
                            </View>
                        )
                    },
                },
                {
                    title: i18n.t('Sex'),
                    render: resource => (
                        <View style={{ flexDirection: 'row' }}>
                            <SexPreview sex={resource.sex} size={20} style={{marginRight: 10}} />
                            <Text>
                                {{
                                    'male': i18n.t('Male'),
                                    'female': i18n.t('Female'),
                                    'unknown': i18n.t('Unknown'),
                                }[resource.sex]}
                            </Text>
                        </View>
                    ),
                },
                {
                    title: i18n.t('Born'),
                    text: resource => resource.born_at
                        ? (new Date(resource.born_at)).toLocaleString()
                        : undefined,
                },
                {
                    title: i18n.t('Notes'),
                    multiline: resource => resource.notes,
                    text: resource => resource.notes,
                },
            ],
        },
        {
            title: i18n.t('Data'),
            data: [
                {
                    title: i18n.t('Cubs'),
                    onPress: () => {
                        alert('@wip');
                    },
                },
                {
                    title: i18n.t('Family'),
                    onPress: () => {
                        alert('@wip');
                    },
                },
                {
                    title: i18n.t('Media'),
                    onPress: () => {
                        alert('@wip');
                    },
                },
                {
                    title: i18n.t('Events'),
                    onPress: () => {
                        alert('@wip');
                    },
                },
            ],
        },
    ];

    title = item => {
        return (item.name || item.identifier || '(' + i18n.t('name not set') + ')');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={items}
                title={title}
                fetch={VIEW_ANIMAL}
                    
                routes={{
                    edit: 'EditAnimal',
                }}
            />
        </Layout>
    )
}

ViewAnimalScreen.navigationOptions = ResourceView.navigationOptions;
