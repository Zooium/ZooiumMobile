import React from 'react';
import { Linking } from 'expo';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import RadioGroup from '@components/RadioGroup.js';
import SexPreview from '@components/SexPreview.js';
import EventSettings from '@settings/EventSettings.js';
import CitesListing from '@components/CitesListing.js';
import SpecieSettings from '@settings/SpecieSettings.js';
import { Text, Icon, Input } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import DataTimePicker from '@components/DateTimePicker.js';
import MultilineInput from '@components/MultilineInput.js';
import { View, Alert, TouchableOpacity } from 'react-native';
import { SpecieTypeaheadInput } from '@screens/SpecieTypeaheadScreen.js';
import { AnimalTypeaheadInput } from '@screens/animals/AnimalTypeaheadScreen.js';
import { EnclosureTypeaheadInput } from '@screens/enclosures/EnclosureTypeaheadScreen.js';

export default class AnimalSettings {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || item.identifier || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Animal', { count: 1 }),
        }) || fallback;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
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
     * Parse resource to form object.
     */
    static formParser = (resource) => ({
        ...resource,
        father_id: resource.father && resource.father.id,
        mother_id: resource.mother && resource.mother.id,
        enclosure_id: resource.enclosure && resource.enclosure.id,
        specie_id: resource.specie && resource.specie.id,
    })

    /**
     * The entity fields.
     *
     * @var {array}
     */
    static fields = [
        /**
         * General Fields
         */
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
                        const { value, state: valueState } = EventSettings.getEventStateSettings(state);

                        // Return state view render.
                        return value && (
                            <TouchableOpacity activeOpacity={state.id ? undefined : 1} onPress={() => {
                                // Skip if not real event.
                                if (! state.id) return;

                                // Navigate to event view.
                                const route = 'EventView';
                                navigation.navigate({
                                    key: route + resource.state.id,
                                    routeName: route,
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
                                preview={AnimalTypeaheadInput}
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
                                preview={AnimalTypeaheadInput}
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
                                    routeName: route,
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
                                preview={EnclosureTypeaheadInput}
    
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
                                    {SpecieSettings.title(resource.specie)}
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
                                preview={SpecieTypeaheadInput}
    
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
    ]

    /**
     * The entity field headers.
     *
     * @var {array}
     */
    static headers = [
        {
            key: 'cubs',
            icon: 'baby',
            title: i18n.t('Cubs'),
            color: theme['color-primary-500'],
            navigate: ({ response }) => ({
                routeName: (route = 'AnimalList'),
                key: route + (search = 'parent:'+response.id),
                params: {
                    appendSearch: search,
                    overrideTitle: i18n.t('Cubs'),

                    defaults: {
                        father: response.sex === 'male' && response || undefined,
                        father_id: response.sex === 'male' && response.id || undefined,

                        mother: response.sex === 'female' && response || undefined,
                        mother_id: response.sex === 'female' && response.id || undefined,

                        specie: response.specie || undefined,
                        specie_id:  response.specie && response.specie.id || undefined,
                    },
                },
            }),
        },
        {
            key: 'events',
            icon: 'calendar-star',
            title: i18n.t('Event', { count: 2 }),
            color: theme['color-success-500'],
            navigate: ({ response }) =>  ({
                routeName: (route = 'EventList'),
                key: route + (search = 'source:animal:'+response.id),
                params: {
                    appendSearch: search,
                    defaults: {
                        resource: response,
                        resource_id: response.id,
                        resource_type: 'Animal',
                    },
                },
            }),
        },
        {
            key: 'family',
            icon: 'dna',
            title: i18n.t('Family'),
            color: theme['color-warning-500'],
            navigate: ({ response }) =>  ({
                routeName: (route = 'AnimalFamily'),
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
            navigate: ({ response }) =>  ({
                routeName: (route = 'AnimalMedia'),
                key: route + response.id,
                params: {
                    item: response,
                },
            }),
        },
    ]
}
