import React from 'react';
import { Text, View, Button } from 'react-native';

export default class ListAnimalsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ListAnimalsScreen</Text>
                <Button title="View" onPress={() => this.props.navigation.navigate('ViewAnimal')} />
                <Button title="Edit" onPress={() => this.props.navigation.navigate('EditAnimal')} />
                <Button title="Enclosure" onPress={() => this.props.navigation.navigate('ViewEnclosure')} />
            </View>
        );
    }
}
