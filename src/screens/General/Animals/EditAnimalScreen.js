import React from 'react';
import { Text, View } from 'react-native';

export default function EditAnimalScreen({ navigation }) {
    const item = navigation.getParam('item');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>EditAnimalScreen</Text>
            <Text>Item: {item ? JSON.stringify(item) : 'creating'}</Text>
        </View>
    );
}
