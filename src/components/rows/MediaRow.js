import theme from '@src/theme.js';
import React, { memo } from 'react';
import Loader from '@components/Loader.js';
import AppStyles from '@utils/AppStyles.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableHighlight } from 'react-native';
import AuthorizedImage from '@components/AuthorizedImage.js';

function MediaRow({ item, index, viewItem, isNew }) {
    const showBorder = (index + 1) % 3 !== 0;

    return (
        <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)} style={{
            flex: 1/3,
            borderRightWidth: showBorder ? 1 : undefined,
            borderRightColor: showBorder ? theme['color-basic-200'] : undefined,
        }}>
            <View style={{
                ...AppStyles.listItem,

                flex: 1,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '100%',
                    aspectRatio: 1,
                    marginBottom: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {item.thumbnail_url && (
                        <AuthorizedImage uri={item.thumbnail_url} style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }} />
                    ) || isNew && <Loader size="small" /> || (
                        <Icon name="file-alt" size={70} color={theme['color-basic-500']} />
                    )}
                </View>

                <Text category="c1" appearance="hint">
                    {item.name}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default memo(MediaRow);
