import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import AppStyles from '@utils/AppStyles.js';
import { Text, Icon } from '@ui-kitten/components';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ResourceViewItem({ item, index, section, form, response, render = 'View' }) {
    // Get navigation state.
    const navigation = useNavigation();

    // Skip if item or header has render condition and not valid.
    if (
        item.shouldRender && ! item.shouldRender(render.toLowerCase(), form && form[0] || response) ||
        section && section.shouldRender && ! section.shouldRender(render.toLowerCase(), form && form[0] || response)
    ) return null;

    // Check if item is navigation button.
    if (item.onPress || item.navigate) {
        return (
            <TouchableOpacity style={[AppStyles.shadow1, {
                height: 70,
                minWidth: 80,

                marginVertical: 10,
                paddingHorizontal: 6,
                marginLeft: index !== 0 && 4 || undefined,
                
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',

                backgroundColor: item.color,
            }]} onPress={() => {
                if (item.navigate) {
                    navigation.navigate(item.navigate({ response }));
                } else {
                    item.onPress({ response, navigation });
                }
            }}>
                <Icon size={28} color="white" name={item.icon} style={{
                    opacity: .9,
                    marginBottom: 4,
                }} />

                <Text category="s1" style={{ color: 'white', lineHeight: 20 }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    // Get render functions for method and run.
    let title = item.title || item[`title${render}`];
    title = typeof title === 'function' ? title(response, { navigation }) : title;
    
    let contents = item.render || item[`render${render}`];
    contents = typeof contents === 'function' ? contents(form || response, { navigation }) : contents;

    let description = item.description || item[`description${render}`];
    description = typeof description === 'function' ? description(response, { navigation }) : description;

    // Determine if multiline field.
    const multiline = item.multiline || item[`multiline${render}`];
    const isMultiline = typeof multiline === 'function' ? multiline(response) : multiline;

    // Define title render.
    const titleRender = typeof title !== 'string' && title || title && (
        <Text category="s2" appearance="hint">
            {title}

            {render === 'Edit' && item.required && item.required(form[0]) && (
                <Text status="danger" style={{ marginLeft: 6 }}>
                    *
                </Text>
            )}
        </Text>
    );

    // Define contents render.
    const contentsRender = typeof contents !== 'string' && contents || contents && (
        <Text>
            {contents}
        </Text>
    ) || (
        <Text appearance="hint" style={{ fontSize: 12 }}>
            ({i18n.t('not provided')})
        </Text>
    );

    // Define description render.
    const descriptionRender = typeof description !== 'string' && description || description && (
        <Text appearance="hint" style={{ fontSize: 10, lineHeight: 12 }}>
            {description}
        </Text>
    );

    // Return the item view.
    return (
        <View style={[AppStyles.listItem, {
            justifyContent: 'flex-start',
            flexDirection: isMultiline ? 'column' : 'row',
            alignItems: isMultiline ? 'flex-start' : 'center',
        }]}>
            {titleRender &&(
                <View style={{
                    width: 100,
                    marginRight: 10,
                    marginBottom: isMultiline ? 12 : 0,
                }}>
                    {titleRender}
                    {descriptionRender}
                </View>
            )}
            
            <View style={{
                flex: 1,
                width: isMultiline ? '100%' : undefined,
            }}>
                {contentsRender}
            </View>
        </View>
    )
}
