import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import AppStyles from '@utils/AppStyles.js';
import { withNavigation } from 'react-navigation';
import { Text, Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ResourceViewItem({ item, section, form, response, render = 'View', navigation }) {
    // Skip if item or header has render condition and not included.
    if (
        item.shouldRender && ! item.shouldRender.includes(render.toLowerCase()) ||
        section.shouldRender && ! section.shouldRender.includes(render.toLowerCase())
    ) return null;

    // Check if item is navigation button.
    if (item.onPress || item.navigate) {
        return (
            <TouchableOpacity style={[AppStyles.listItem, {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }]} onPress={() => {
                if (item.navigate) {
                    navigation.navigate(item.navigate({ response }));
                } else {
                    item.onPress({ response, navigation });
                }
            }}>
                <Text status="primary" category="s1">
                    {item.title}
                </Text>

                <Icon size={24} name="angle-right" color={theme['color-basic-500']} />
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

            {render === 'Edit' && item.required && (
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
            <View style={{
                width: 100,
                marginRight: 10,
                marginBottom: isMultiline ? 12 : 0,
            }}>
                {titleRender}
                {descriptionRender}
            </View>
            
            <View style={{
                flex: 1,
                width: isMultiline ? '100%' : undefined,
            }}>
                {contentsRender}
            </View>
        </View>
    )
}

export default withNavigation(ResourceViewItem);
