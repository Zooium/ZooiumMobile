import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Loader from '@components/Loader.js';
import AppStyles from '@utils/AppStyles.js';
import { useQuery } from '@apollo/react-hooks';
import { View, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Text, Icon } from '@ui-kitten/components';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ResourceView({ items, fetch, variables = {}, routes: { edit } = {}, form, navigation }) {
    useEffect(() => {
        navigation.setParams({
            editItem: edit && ((item) => {
                navigation.navigate({
                    key: edit + item.id,
                    routeName: edit,
                    params: { item },
                });
            }),
        });
    }, []);
    
    const item = navigation.getParam('item');
    const creating = ! item;

    const { loading, data } = fetch && useQuery(fetch, {
        skip: creating,
        variables: {
            id: item && item.id,
            ...variables,
        },
    }) || {};

    const key = data && Object.keys(data)[0];
    let response = key && data && data[key];
    if (! fetch) response = item;

    useEffect(() => {
        // Skip if missing response.
        if (! response) return;

        // Set response item in navigation.
        navigation.setParams({
            item: response,
        });
    }, [response]);

    const renderItem = ({ item }) => {
        const isMultiline = item.multiline && item.multiline(response);

        if (item.onPress) {
            return (
                <TouchableOpacity style={[AppStyles.listItem, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }]} onPress={() => item.onPress({ response, navigation })}>
                    <Text status="primary" category="s1">
                        {item.title}
                    </Text>

                    <Icon size={24} name="angle-right" color={theme['color-basic-500']} />
                </TouchableOpacity>
            );
        }
        
        const title = typeof item.title === 'function' && item.title(response) || item.title;
        const titleRender = typeof title !== 'string' ? title : (
            <Text category="s2" appearance="hint">
                {title}

                {item.required && (
                    <Text status="danger" style={{ marginLeft: 6 }}>
                        *
                    </Text>
                )}
            </Text>
        );
        
        const contents = item.render && item.render(form || response) || item.text && item.text(response);
        const contentsRender = typeof contents !== 'string' ? contents : (
            <Text>
                {contents}
            </Text>
        );

        return (
            <View style={[AppStyles.listItem, {
                justifyContent: 'flex-start',
                flexDirection: isMultiline ? 'column' : 'row',
                alignItems: isMultiline ? 'flex-start' : 'center',
            }]}>
                <View style={{
                    width: 100,
                    marginRight: 10,
                    marginBottom: isMultiline ? 12 : 0,
                }}>
                    {titleRender}
                    {item.description && item.description()}
                </View>
                
                <View style={{
                    flex: 1,
                    width: isMultiline ? '100%' : undefined,
                }}>
                    {contentsRender || (
                        <Text appearance="hint" style={{ fontSize: 12 }}>
                            ({i18n.t('not provided')})
                        </Text>
                    )}
                </View>
            </View>
        )
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Text category="label" style={AppStyles.listSection}>
                {section.title.toUpperCase()}
            </Text>
        );
    }

    return loading ? <Loader /> : (
        <SectionList
            sections={items}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}

ResourceView.propTypes = {
    fetch: PropTypes.object,
    variables: PropTypes.object,

    routes: PropTypes.shape({
        edit: PropTypes.string,
    }),

    items: PropTypes.arrayOf(PropTypes.object),
    item: PropTypes.shape({
        required: PropTypes.bool,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.elementType,
        ]).isRequired,

        
        text: PropTypes.string,
        description: PropTypes.string,
        render: PropTypes.elementTypeType,
        onPress: PropTypes.func,
        multiline: PropTypes.func,
    }),

    section: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
}

ResourceView.navigationOptions = ({ title, navigation }) => {
    const item = navigation.getParam('item');
    const editItem = navigation.getParam('editItem');

    return {
        title: title && title(item),
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: editItem && (
            <HeaderButtons>
                <Item title="edit" iconName="pencil" onPress={() => {
                    editItem(item);
                }} />
            </HeaderButtons>
        ),
    };
};

export default withNavigation(ResourceView);