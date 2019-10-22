import React from 'react';
import { Text, View } from 'react-native';

export default function ViewAnimalScreen({ navigation }) {
    const item = navigation.getParam('item');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>ViewAnimalScreen</Text>
            <Text>Item: {JSON.stringify(item, null, 2)}</Text>
        </View>
    );
}
