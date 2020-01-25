import React from 'react';
import { Linking } from 'expo';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import Event from '@models/Event.model.js';
import Specie from '@models/Specie.model.js';
import Animal from '@models/Animal.model.js';
import Enclosure from '@models/Animal.model.js';
import RadioGroup from '@components/RadioGroup.js';
import SexPreview from '@components/SexPreview.js';
import CitesListing from '@components/CitesListing.js';
import { Text, Icon, Input } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import DataTimePicker from '@components/DateTimePicker.js';
import MultilineInput from '@components/MultilineInput.js';
import { View, Alert, TouchableOpacity } from 'react-native';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import UPDATE_ANIMAL from '@graphql/mutations/Animal/updateAnimal.gql.js';
import CREATE_ANIMAL from '@graphql/mutations/Animal/createAnimal.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalViewScreen(props) {
    return (
        <ResourceWrapper
            items={fields}
            headers={headers}

            formInit={form}
            parser={parser}

            fetch={VIEW_ANIMAL}
            mutations={{
                save: UPDATE_ANIMAL,
                create: CREATE_ANIMAL,
                remove: DELETE_ANIMALS,
            }}
                
            routes={{
                view: 'AnimalView',
                edit: 'AnimalEdit',
            }}

            {...props}
        />
    );
}

AnimalViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: Animal.title,
});

/**
 * Define resource form.
 */
export const form = () => ({
    identifier: '',
    name: '',
    father_id: undefined,
    mother_id: undefined,
    enclosure_id: undefined,
    specie_id: undefined,
    sex: 'unknown',
    born: undefined,
    notes: '',
})

/**
 * Define resource parser.
 */
export const parser = (item) => {
    item.father_id = item.father_id || item.father && item.father.id || undefined;
    item.mother_id = item.mother_id || item.mother && item.mother.id || undefined;
    item.specie_id = item.specie_id || item.specie && item.specie.id || undefined;
    item.enclosure_id = item.enclosure_id || item.enclosure && item.enclosure.id || undefined;
}

/**
 * Define resource headers.
 */
export const headers = [
    {
        key: 'cubs',
        icon: 'baby',
        title: i18n.t('Cubs'),
        color: theme['color-primary-500'],
        navigate: ({ response, route = 'AnimalList', search = 'parent:'+response.id }) => ({
            name: route,
            key: route + search,
            params: {
                appendSearch: search,
                overrideTitle: i18n.t('Cubs'),

                createParams: {
                    defaults: {
                        father: response.sex === 'male' && response || undefined,
                        father_id: response.sex === 'male' && response.id || undefined,

                        mother: response.sex === 'female' && response || undefined,
                        mother_id: response.sex === 'female' && response.id || undefined,

                        specie: response.specie || undefined,
                        specie_id:  response.specie && response.specie.id || undefined,
                    },
                },
            },
        }),
    },
    {
        key: 'events',
        icon: 'calendar-star',
        title: i18n.t('Event', { count: 2 }),
        color: theme['color-success-500'],
        navigate: ({ response, route = 'EventList', search = 'source:animal:'+response.id }) =>  ({
            name: route,
            key: route + search,
            params: {
                appendSearch: search,
                
                createParams: {
                    defaults: {
                        resource: response,
                        resource_id: response.id,
                        resource_type: 'Animal',
                    },
                },
            },
        }),
    },
    {
        key: 'family',
        icon: 'dna',
        title: i18n.t('Family'),
        color: theme['color-warning-500'],
        navigate: ({ response, route = 'AnimalFamily' }) =>  ({
            name: route,
            key: route + response.id,
            params: {
                item: response,
            },
        }),
    },
    {
        key: 'media',
        icon: 'photo-video',
        title: i18n.t('Media'),
        color: theme['color-danger-500'],
        navigate: ({ response, route = 'AnimalMedia' }) =>  ({
            name: route,
            key: route + response.id,
            params: {
                item: response,
            },
        }),
    },
];

/**
 * Define resource fields.
 */
export const fields = [
    {
        title: i18n.t('General'),

        data: [
            {
                key: 'state',
                title: i18n.t('State'),
                shouldRender: (view) => view === 'view',
                renderView: function StateViewRender(resource, { navigation }) {
                    // Get resource state or fallback to born at or created at.
                    const state = resource.state || (resource.born_at && {
                        state: 'active',
                        value: 'born',
                        occurred_at: resource.born_at,
                    }) || (resource.created_at && {
                        state: 'active',
                        value: 'registered',
                        occurred_at: resource.created_at,
                    });

                    // Get settings for resource state.
                    const { value, state: valueState } = Event.getEventStateSettings(state);

                    // Return state view render.
                    return value && (
                        <TouchableOpacity activeOpacity={state.id ? undefined : 1} onPress={() => {
                            // Skip if not real event.
                            if (! state.id) return;

                            // Navigate to event view.
                            const route = 'EventView';
                            navigation.navigate({
                                key: route + resource.state.id,
                                name: route,
                                params: {
                                    item: resource.state,
                                },
                            });
                        }}>
                            <Text style={{ color: value.color }}>
                                {valueState.text} ({value.text})
                            </Text>

                            {state.occurred_at && (
                                <Text category="c1" appearance="hint">
                                    {new Date(state.occurred_at).toLocaleString()}
                                </Text>
                            )}
                        </TouchableOpacity>
                    )
                },
            },
            {
                key: 'id',
                title: i18n.t('ID'),
                renderView: resource => resource.identifier,
                renderEdit: function IdentifierEditRender([state, mergeState]) {
                    return <Input value={state.identifier} onChangeText={(value) => mergeState({ identifier: value })} />;
                },
                descriptionEdit: () => i18n.t('A unique identifier for the animal such as a DNA test filing-number or ring number.'),
            },
            {
                key: 'name',
                title: i18n.t('Name'),
                renderView: resource => resource.name,
                renderEdit: function NameEditRender([state, mergeState]) {
                    return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                },
            },
            {
                key: 'father_id',
                title: i18n.t('Father'),
                shouldRender: (view) => view === 'edit',
                renderEdit: function FatherEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="AnimalEdit"
                            view="AnimalTypeahead"
                            resource={i18n.t('Father')}
                            preview={Animal.title}
                            appendSearch={
                                (state.id ? 'exclude:'+state.id : '')+' exclude:sex:female'
                            }

                            value={state.father}
                            onChange={(value) => mergeState({
                                father: value,
                                father_id: value && value.id || null,
                            })}
                        />
                    );
                },
            },
            {
                key: 'mother_id',
                title: i18n.t('Mother'),
                shouldRender: (view) => view === 'edit',
                renderEdit: function MotherEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="AnimalEdit"
                            view="AnimalTypeahead"
                            resource={i18n.t('Mother')}
                            preview={Animal.title}
                            appendSearch={
                                (state.id ? 'exclude:'+state.id : '')+' exclude:sex:male'
                            }

                            value={state.mother}
                            onChange={(value) => mergeState({
                                mother: value,
                                mother_id: value && value.id || null,
                            })}
                        />
                    );
                },
            },
            {
                key: 'enclosure_id',
                title: i18n.t('Enclosure', { count: 1 }),
                renderView: function EnclosureViewRender(resource, { navigation }) {
                    return resource.enclosure && (
                        <TouchableOpacity onPress={() => {
                            const route = 'EnclosureView';
                            navigation.navigate({
                                key: route + resource.enclosure.id,
                                name: route,
                                params: {
                                    item: resource.enclosure,
                                },
                            })
                        }}>
                            <Text status="primary">{resource.enclosure.name}</Text>
                        </TouchableOpacity>
                    )
                },
                renderEdit: function EnclosureEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="EnclosureEdit"
                            view="EnclosureTypeahead"
                            resource={i18n.t('Enclosure')}
                            preview={Enclosure.title}

                            value={state.enclosure}
                            onChange={(value) => mergeState({
                                enclosure: value,
                                enclosure_id: value && value.id || null,
                            })}
                        />
                    );
                },
            },
            {
                key: 'specie_id',
                title: i18n.t('Specie', { count: 1 }),
                renderView: function SpecieViewRender(resource) {
                    return resource.specie && (
                        <View>
                            <Text>
                                {Specie.title(resource.specie)}
                            </Text>

                            <Text category="c1" appearance="hint">
                                {resource.specie.scientific}
                            </Text>
                        </View>
                    )
                },
                renderEdit: function SpecieEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            view="SpecieTypeahead"
                            resource={i18n.t('Specie', { count: 1 })}
                            preview={Specie.title}

                            value={state.specie}
                            onChange={(value) => mergeState({
                                specie: value,
                                specie_id: value && value.id || null,
                            })}
                        />
                    );
                },
                descriptionEdit: () => i18n.t('Hybrids are not listed and subspecies may be listed under their parent-specie name.'),
            },
            {
                key: 'cites',
                shouldRender: (view) => view === 'view',
                titleView: function CitesTitleViewRender() {
                    return (
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} onPress={() => {
                            Alert.alert(i18n.t('Disclaimer'), i18n.t('cites.disclaimer'));
                        }}>
                            <Text category="s2" appearance="hint" style={{ marginRight: 4 }}>
                                CITES
                            </Text>

                            <Icon size={12} name="question-circle" color={theme['color-primary-500']} solid />
                        </TouchableOpacity>
                    )
                },
                renderView: function citesViewRender(resource) {
                    const cites = resource.cites || resource.specie && resource.specie.cites;
                    const listings = cites && cites.listing.split('/')
                    
                    const readMoreAddress = cites
                        ? `https://speciesplus.net/species#/taxon_concepts/${cites.source_id}/legal`
                        : `https://speciesplus.net/species#/taxon_concepts?taxonomy=cites_eu&taxon_concept_query=${encodeURI(resource.specie && resource.specie.scientific)}&geo_entity_scope=cites&page=1`;

                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {cites && listings.map((value) => {
                                return <CitesListing key={value} listing={value} style={{ marginRight: 4 }} />;
                            })}

                            {(resource.specie && (! cites || ! listings.length)) && (
                                <Text appearance="hint" style={{ marginRight: 10 }}>
                                    {i18n.t('None')}
                                </Text>
                            )}

                            {resource.specie && (
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    marginLeft: cites ? 4 : 0,
                                }} onPress={() => {
                                    Linking.openURL(readMoreAddress);
                                }}>
                                    <Text status="primary" style={{ marginRight: 4 }}>
                                        {i18n.t('Read more')}
                                    </Text>
                                </TouchableOpacity>
                            ) || (
                                <Text appearance="hint" style={{ fontSize: 12 }}>
                                    ({i18n.t('not provided')})
                                </Text>
                            )}
                        </View>
                    )
                },
            },
            {
                key: 'sex',
                title: i18n.t('Sex'),
                renderView: function SexViewRender(resource) {
                    return (
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
                    )
                },
                renderEdit: function SexEditRender([state, mergeState]) {
                    return (
                        <RadioGroup
                            options={{
                                'male': i18n.t('Male'),
                                'female': i18n.t('Female'),
                                'unknown': i18n.t('Unknown'),
                            }}
                            selected={state.sex}
                            onChange={(key) => mergeState({
                                sex: key,
                            })}
                        />
                    );
                },
            },
            {
                key: 'born_at',
                title: i18n.t('Born'),
                renderView: resource => resource.born_at && (new Date(resource.born_at)).toLocaleString() || undefined,
                renderEdit: function BornEditRender([state, mergeState]) {
                    return (
                        <DataTimePicker value={state.born_at} onChange={(value) => mergeState({
                            born_at: value,
                        })} />
                    );
                },
            },
            {
                key: 'notes',
                title: i18n.t('Notes'),
                renderView: resource => resource.notes,
                renderEdit: function NotesEditRender([state, mergeState]) {
                    return <MultilineInput
                        numberOfLines={4}
                        value={state.notes}
                        onChangeText={(value) => mergeState({ notes: value })}
                    />;
                },
                multilineView: resource => resource.notes,
                multilineEdit: () => true,
            },
        ],
    },
];
