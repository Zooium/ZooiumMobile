import React from 'react';
import theme from '@src/theme.js'
import { mapping } from '@eva-design/eva';
import AppContainer from '@routes/AppContainer.js';
import { ApplicationProvider } from 'react-native-ui-kitten';

export default class App extends React.Component {
    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={theme}>
                <AppContainer />
            </ApplicationProvider>
        );
    }
}
