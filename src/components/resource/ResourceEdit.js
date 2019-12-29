import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import AuthState from '@utils/AuthState.js';
import ResourceView from './ResourceView.js';
import { withNavigation } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';
import LoadingModal from '@components/LoadingModal.js';
import React, { useState, useEffect, Fragment } from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceEdit({ formInit, formParser, routes: { view } = {}, mutations: { save, create }, navigation, ...props }) {
    // Create form state from passed init function.
    const defaults = navigation.getParam('defaults') || {};
    const form = useState({...formInit(), ...defaults});
    const [state, setState] = form;

    // Add merge state function as second param.
    form[1] = (change) => {
        setState({
            ...state,
            ...change,
        })
    };

    // Share form state and items with navigation.
    useEffect(() => {
        navigation.setParams({ state, items: props.items });
    }, [state, props.items]);

    // Define update/create mutations.
    const [saveItem, { loading: saving }] = useMutation(save);
    const [createItem, { loading: creating }] = useMutation(create);

    // Pass save function to navigation.
    useEffect(() => {
        navigation.setParams({
            save: ({ item, items, state }) => {
                // Gather incomplete required items.
                let incomplete = [];
                items.forEach(category => {
                    category.data.forEach(item => {
                        // Push title to incomplete if required and not set.
                        if (item.required && ! state[item.key]) {
                            incomplete.push(item.title);
                        }
                    });
                });

                // Show error if has incomplete items.
                if (incomplete.length) {
                    // Return incomplete submission alert.
                    return Alert.alert(
                        i18n.t('Incomplete Submission'),
                        i18n.t('The following fields are required: {{fields}}', {
                            fields: incomplete.join(', '),
                        })
                    );
                }

                // Determine save function based on item existing.
                const isSaving = item !== undefined;
                const saveFunction = item ? saveItem : createItem;

                // Attempt to save the item.
                saveFunction({
                    variables: {
                        team_id: AuthState.currentTeam().id,
                        ...state,
                    },
                }).then(({ data }) => {
                    // Get item from response.
                    const item = data[Object.keys(data)[0]];

                    // Go back if missing view route.
                    if (! view) {
                        // Check if has on save action.
                        const onSave = navigation.getParam('onSave');
                        onSave && onSave(item, isSaving);

                        // Return back to previous.
                        return navigation.goBack();
                    }

                    // Navigate to view route on success.
                    navigation.navigate({
                        key: view + item.id,
                        routeName: view,
                        params: { item },
                    });
                }).catch(error => {
                    // @wip
                    console.log(error);
                });
            },
        });
    }, []);

    // Get item and prepare parsing state.
    const item = navigation.getParam('item');
    const [parsing, setParsing] = useState(item !== undefined);

    // Parse form and disable parsing on item change.
    useEffect(() => {
        if (item) {
            setState(formParser && formParser(item) || item);
            setParsing(false);
        }
    }, [item]);

    // Return the resource view.
    return (
        <Fragment>
            <ResourceView form={form} render="Edit" loading={parsing} {...props} />

            {(saving || creating) && <LoadingModal text={i18n.t('Saving...')} />}
        </Fragment>
    );
}

ResourceEdit.navigationOptions = ({ title, navigation }) => {
    const item = navigation.getParam('item');

    return {
        title: title && title(item),
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: (
            <HeaderButtons>
                <Item title={item ? 'save' : 'create'} iconName={item ? 'save' : 'plus'} onPress={() => {
                    navigation.getParam('save')({
                        item: navigation.getParam('item'),
                        items: navigation.getParam('items'),
                        state: navigation.getParam('state'),
                    });
                }} />
            </HeaderButtons>
        ),
    };
}

ResourceEdit.propTypes = {
    ...ResourceView.propTypes,

    formParser: PropTypes.func,
    formInit: PropTypes.func.isRequired,
    
    routes: PropTypes.shape({
        view: PropTypes.string,
    }),

    mutations: PropTypes.shape({
        create: PropTypes.object,
        save: PropTypes.object.isRequired,
    }),
}

export default withNavigation(ResourceEdit);
