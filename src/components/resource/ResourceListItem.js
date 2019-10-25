import React, { memo } from 'react';
import { View, TouchableHighlight } from 'react-native';

export default memo(({ item, viewItem, preview: Preview }) => (
    <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)}>
        <View style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',

            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            
            elevation: 5,
        }}>
            <Preview item={item} />
        </View>
    </TouchableHighlight>
));
