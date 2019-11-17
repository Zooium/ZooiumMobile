import React from 'react';
import i18n from '@src/i18n.js';
import TypeaheadInput from '@components/TypeaheadInput.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import { Text, Radio, RadioGroup, Layout, Input } from 'react-native-ui-kitten';
import { AnimalTypeaheadInput } from '@screens/Typeahead/AnimalTypeaheadScreen.js';
import { EnclosureTypeaheadInput } from '@screens/Typeahead/EnclosureTypeaheadScreen.js';

const items = [
    {
        title: i18n.t('General'),
        data: [
            {
                title: i18n.t('ID'),
                description: function IdentifierDescriptionRender() {
                    return (
                        <Text appearance="hint" style={{ fontSize: 10, lineHeight: 12 }}>
                            {i18n.t('A unique identifier for the animal such as a DNA test filing-number or ring number.')}
                        </Text>
                    );
                },

                render: function IdentifierRender([state, mergeState]) {
                    return <Input value={state.identifier} onChangeText={(value) => mergeState({ identifier: value })} />;
                },
            },
            {
                title: i18n.t('Name'),
                render: function NameRender([state, mergeState]) {
                    return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                },
            },
            {
                title: i18n.t('Father'),
                render: function FatherRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            view="AnimalTypeahead"
                            resource={i18n.t('Father')}
                            preview={AnimalTypeaheadInput}
                            appendQuery={
                                (state.id ? '' : 'exclude:'+state.id)+' exclude:sex:female'
                            }

                            value={state.father}
                            onChange={(value) => mergeState({
                                father: value,
                                father_id: value && value.id || undefined,
                            })}
                        />
                    );
                },
            },
            {
                title: i18n.t('Mother'),
                render: function MotherRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            view="AnimalTypeahead"
                            resource={i18n.t('Mother')}
                            preview={AnimalTypeaheadInput}
                            appendQuery={
                                (state.id ? '' : 'exclude:'+state.id)+' exclude:sex:male'
                            }

                            value={state.mother}
                            onChange={(value) => mergeState({
                                mother: value,
                                mother_id: value && value.id || undefined,
                            })}
                        />
                    );
                },
            },
            {
                title: i18n.t('Enclosure', { count: 1 }),
                render: function EnclosureRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            view="EnclosureTypeahead"
                            resource={i18n.t('Enclosure')}
                            preview={EnclosureTypeaheadInput}

                            value={state.enclosure}
                            onChange={(value) => mergeState({
                                enclosure: value,
                                enclosure_id: value && value.id || undefined,
                            })}
                        />
                    );
                },
            },
            {
                title: i18n.t('Specie', { count: 1 }),
                description: function IdentifierDescriptionRender() {
                    return (
                        <Text appearance="hint" style={{ fontSize: 10, lineHeight: 12 }}>
                            {i18n.t('Hybrids are not listed and subspecies may be listed under their parent-specie name.')}
                        </Text>
                    );
                },

                render: function SpecieRender([state, mergeState]) {
                    return undefined; // @wip
                },
            },
            {
                title: i18n.t('Sex'),
                render: function SexRender([state, mergeState]) {
                    let sexes = {
                        'male': i18n.t('Male'),
                        'female': i18n.t('Female'),
                        'unknown': i18n.t('Unknown'),
                    };

                    return (
                        <RadioGroup
                            selectedIndex={Object.keys(sexes).indexOf(state.sex)}
                            onChange={(index) => {
                                mergeState({
                                    sex: Object.keys(sexes)[index],
                                });
                            }}
                        >
                            {Object.values(sexes).map((value, key) => {
                                return <Radio key={key} text={value} textStyle={{ fontWeight: 'normal' }} style={{
                                    marginBottom: 6,
                                }} />;
                            })}
                        </RadioGroup>
                    );
                },
            },
            {
                title: i18n.t('Born'),
                render: function BornRender([state, mergeState]) {
                    return undefined; // @wip
                },
            },
            {
                title: i18n.t('Notes'),
                multiline: () => true,
                render: function NotesRender([state, mergeState]) {
                    return <Input
                        multiline={true}
                        numberOfLines={4}
                        value={state.notes}
                        onChangeText={(value) => mergeState({ notes: value })}
                        // @wip - text in top of element not center.
                    />;
                },
            },
        ],
    },
];

const title = item => {
    return item && (item.name || item.identifier || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
        resource: i18n.t('Animal', { count: 1 }),
    });
}

const formInit = () => ({
    identifier: '',
    name: '1234', // @wip
    father_id: undefined,
    mother_id: undefined,
    enclosure_id: undefined,
    specie_id: undefined,
    sex: 'unknown',
    born: undefined,
    notes: '',
})

const formParser = (resource) => {
    return {
        father_id: resource.father && resource.father.id,
        mother_id: resource.mother && resource.mother.id,
        enclosure_id: resource.enclosure && resource.enclosure.id,
        specie_id: resource.specie && resource.specie.id,

        ...resource,
    }
}

export default function EditAnimalScreen({ navigation }) {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={items}
                    title={title}
                    fetch={VIEW_ANIMAL}

                    formInit={formInit}
                    formParser={formParser}
                        
                    routes={{
                        edit: 'EditAnimal',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditAnimalScreen.navigationOptions = ResourceEdit.navigationOptions;
