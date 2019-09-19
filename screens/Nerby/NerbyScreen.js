import React from 'react';
import { Text, View, Button } from 'react-native';

export default class NerbyScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>NerbyScreen</Text>
                <Button title="View Animal" onPress={() => this.props.navigation.navigate('ViewAnimal')} />
                <Button title="View Enclosure" onPress={() => this.props.navigation.navigate('ViewEnclosure')} />
            </View>
        );
    }
}
