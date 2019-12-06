import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import Loader from '@components/Loader.js';
import { View, Alert } from 'react-native';
import AuthState from '@utils/AuthState.js';
import ResourceView from './ResourceView.js';
import { Text } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect, Fragment } from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceEdit({ formInit, formParser, routes: { view }, mutations: { save, create }, navigation, ...props }) {
    // Create form state from passed init function.
    const form = useState(formInit());
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

    // @wip - cache?
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
                const saveFunction = item ? saveItem : createItem;

                // Attempt to save the item.
                saveFunction({
                    variables: {
                        team_id: AuthState.currentTeam().id,
                        ...state,
                    },
                }).then(({ data }) => {
                    // Navigate to view route on success.
                    navigation.navigate(view, {
                        item: data[Object.keys(data)[0]],
                    })
                }).catch(error => {
                    // @wip
                    console.log(error);
                });
            },
        });
    }, []);

    // Get and parse item form on change.
    const item = navigation.getParam('item');
    useEffect(() => {
        if (item) {
            setState(formParser(item));
        }
    }, [item]);

    // Return the resource view.
    return (
        <Fragment>
            <ResourceView form={form} {...props} />

            {(saving || creating) && (
                <View style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                    <Loader style={{
                        borderRadius: 6,
                        paddingVertical: 14,
                        paddingHorizontal: 34,
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}>
                        <Text category="s1" status="primary" style={{ marginTop: 10 }}>
                            {i18n.t('Saving...')}
                        </Text>
                    </Loader>
                </View>
            )}
        </Fragment>
    );
}

ResourceEdit.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');
    const getTitle = navigation.getParam('getTitle');

    return {
        title: getTitle ? getTitle(item) : undefined,
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

    formInit: PropTypes.func.isRequired,
    formParser: PropTypes.func.isRequired,
    
    routes: PropTypes.shape({
        view: PropTypes.string.isRequired,
    }),

    mutations: PropTypes.shape({
        save: PropTypes.object.isRequired,
        create: PropTypes.object.isRequired,
    }),
}

export default withNavigation(ResourceEdit);
