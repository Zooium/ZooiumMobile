import i18n from '@src/i18n.js';
import AuthState from '@utils/AuthState.js';
import ResourceView from './ResourceView.js';
import { Alert, Keyboard } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import LoadingModal from '@components/LoadingModal.js';
import DeletionConfirmation from '@utils/DeletionConfirmation.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function ResourceEdit({ formInit, routes: { view } = {}, mutations: { save, create, remove }, items, ...props }) {
    // Create form state from passed init function.
    const navigation = useNavigation();
    const defaults = useNavigationParam('defaults') || {};
    const form = useState({...formInit(), ...defaults});
    const [state, setState] = form;

    // Add merge state function as second param.
    const mergeState = useCallback((change) => {
        setState(previous => ({
            ...previous,
            ...change,
        }));
    }, [setState]);

    form[1] = mergeState;

    // Get item from navigation.
    const item = useNavigationParam('item');
    const isCreating = ! item;

    // Define update/create mutations.
    const variables = { team_id: AuthState.currentTeam().id, ...state };
    const [saveItem, { loading: saving }] = useMutation(save, { variables });
    const [createItem, { loading: creating }] = useMutation(create, { variables });

    // Check for incomplete items on state change.
    useEffect(() => {
        // Gather incomplete required items.
        let incomplete = [];
        items.forEach(category => {
            category.data.forEach(item => {
                // Push title to incomplete if required and not set.
                if (item.required && item.required(state) && ! state[item.key]) {
                    incomplete.push(item.title);
                }
            });
        });

        // Share incomplete items with navigation.
        navigation.setParams({
            incomplete: incomplete.length && incomplete,
        });
    }, [items, state]);

    // Share save form with navigation. 
    useEffect(() => {
        // Define save form function.
        const saveForm = ({ navigation }) => {
            // Dismiss the keyboard.
            Keyboard.dismiss();

            // Show error if has incomplete items.
            const incomplete = navigation.getParam('incomplete');
            if (incomplete && incomplete.length) {
                // Return incomplete submission alert.
                return Alert.alert(
                    i18n.t('Incomplete Submission'),
                    i18n.t('The following fields are required: {{fields}}', {
                        fields: incomplete.join(', '),
                    })
                );
            }
    
            // Determine save function based on creating.
            const saveFunction = isCreating ? createItem : saveItem;
    
            // Attempt to save the item.
            saveFunction().then(({ data }) => {
                // Get item from response.
                const item = data[Object.keys(data)[0]];
    
                // Check if has on save action. 
                const onSave = navigation.getParam('onSave');
                const popCount = onSave && onSave(item, ! isCreating);
                if (popCount && navigation.pop(+popCount)) return;
    
                // Go back if missing view route.
                if (! view && navigation.goBack()) return;

                // Check if creating new item.
                if (isCreating) {
                    // Navigate to new item view.
                    navigation.navigate({
                        key: view + item.id,
                        routeName: view,
                        params: { item },
                    });
                } else {
                    // Replace edit screen with view.
                    navigation.replace({
                        routeName: view,
                        params: { item },
                    });
                }
            }).catch(error => {
                // TODO Implement validation handler.
                console.error(error);
            });
        };

        // Set save form param on navigation.
        navigation.setParams({ save: saveForm });
    }, [isCreating, view, saveItem, createItem]);

    // Parse item into state if available.
    const [parsing, setParsing] = useState(! isCreating);
    useEffect(() => {
        if (item) {
            mergeState(item);
            setParsing(false);
        }
    }, [item, mergeState, setParsing]);

    // Return the resource view.
    return (
        <Fragment>
            <ResourceView
                form={form}
                items={items}
                render="Edit"
                loading={parsing}
                mutations={{ remove }}
                {...props}
            />

            {(saving || creating) && <LoadingModal text={i18n.t('Saving...')} />}
        </Fragment>
    );
}

ResourceEdit.navigationOptions = ({ title, canModify, navigation }) => {
    const item = navigation.getParam('item');
    const deleteItem = navigation.getParam('deleteItem');

    return {
        title: title && title(item),

        headerRight: function ModifyButtons() {
            return (
                <HeaderButtons>
                    {item && (
                        <Item title="delete" iconName="trash-alt" onPress={() => {
                            // Skip if not allowed to modify item. 
                            const msg = item && canModify && canModify(item);
                            if (typeof msg === 'string') return Alert.alert(msg);

                            // Show deletion confirmation.
                            deleteItem && DeletionConfirmation(title(item), () => {
                                deleteItem(item);
                            });
                        }} />
                    )}

                    <Item title={item ? 'save' : 'create'} iconName={item ? 'save' : 'plus'} onPress={() => {
                        // Skip if not allowed to modify item.
                        const msg = item && canModify && canModify(item);
                        if (typeof msg === 'string') return Alert.alert(msg);

                        // Save or create item.
                        navigation.getParam('save')({ navigation });
                    }} />
                </HeaderButtons>
            );
        },
    };
}

