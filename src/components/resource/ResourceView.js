import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Loader from '@components/Loader.js';
import AppStyles from '@utils/AppStyles.js';
import { useQuery } from '@apollo/react-hooks';
import { View, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Text, Icon } from 'react-native-ui-kitten';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ResourceView({ title, items, fetch, variables = {}, routes: { edit } = {}, form, navigation }) {
    useEffect(() => {
        navigation.setParams({
            getTitle: title,
            editItem: edit && ((item) => {
                navigation.navigate(edit, { item });
            }),
        });
    }, []);
    
    const item = navigation.getParam('item');
    const creating = ! item;

    const { loading, data } = useQuery(fetch, {
        skip: creating,
        variables: {
            id: item && item.id,
            ...variables,
        },
    });

    const key = data && Object.keys(data)[0];
    const response = key && data && data[key];

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
                }]} onPress={item.onPress}>
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
            keyExtractor={(item, index) => item + index}
        />
    );
}

ResourceView.propTypes = {
    title: PropTypes.func.isRequired,

    fetch: PropTypes.object.isRequired,
    variables: PropTypes.object,

    routes: PropTypes.shape({
        edit: PropTypes.string,
    }),

    items: PropTypes.arrayOf(PropTypes.object),
    item: PropTypes.shape({
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

ResourceView.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');
    const editItem = navigation.getParam('editItem');
    const getTitle = navigation.getParam('getTitle');

    return {
        title: getTitle ? getTitle(item) : undefined,
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: editItem && (
            <HeaderButtons>
                <Item title="edit" iconName="edit" style={{ marginRight: 10 }} onPress={() => {
                    editItem(item);
                }} />
            </HeaderButtons>
        ),
    };
};

export default withNavigation(ResourceView);