import React from 'react';
import { Text, View, Button } from 'react-native';

export default class MoreScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MoreScreen</Text>
                <Button title="List Animals" onPress={() => this.props.navigation.navigate('Animals')} />
                <Button title="List Enclosures" onPress={() => this.props.navigation.navigate('ListEnclosures')} />
                <Button title="List Locations" onPress={() => this.props.navigation.navigate('ListLocations')} />
            </View>
        );
    }
}
