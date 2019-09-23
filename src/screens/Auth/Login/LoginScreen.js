import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js'
import SafeView from '@components/SafeView.js';
import { Image, StyleSheet } from 'react-native';
import { Text, Input, Button, Layout } from 'react-native-ui-kitten';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
    }

    password = React.createRef()

    submit = () => {
        // @wip
        this.props.navigation.navigate('Main');
    }

    render = () => (
        <SafeView style={styles.background}>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}> 
                <Layout style={styles.container}>
                    <Layout style={styles.brand}>
                        <Image style={styles.logo} source={require('@assets/icon.png')} />
                        <Text category="h3" style={styles.brandText}>Zooium</Text>
                    </Layout>

                    <Layout style={styles.form}>
                        <Input
                            value={this.state.username}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onChangeText={username => this.setState({ username })}
                            onSubmitEditing={() => this.password.current.focus()}
                            size="large"
                            textContentType="username"
                            placeholder={i18n.t('Username')}
                            style={styles.input}
                        />
                        
                        <Input
                            ref={this.password}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            onSubmitEditing={this.submit}
                            size="large"
                            textContentType="password"
                            placeholder={i18n.t('Password')}
                            secureTextEntry={true}
                        />
                    </Layout>

                    <Button status="white" size="giant" onPress={this.submit} style={styles.submit}>
                        {i18n.t('Login')}
                    </Button>
                </Layout>
            </KeyboardAwareScrollView>
        </SafeView>
    );
}

let styles = StyleSheet.create({
    background: {
        backgroundColor: theme['color-primary-500'],
    },

    container: {
        flex: 1,
        alignContent: 'space-between',
        backgroundColor: theme['color-primary-500'],
    },

    brand: {
        padding: '5%',
        alignItems: 'center',
        backgroundColor: theme['color-primary-500'],
    },

    form: {
        flex: 1,
        padding: '5%',
        justifyContent: 'center',
        backgroundColor: theme['color-primary-500'],
    },

    submit: {
        borderRadius: 0,
    },

    logo: {
        marginBottom: '5%',
    },

    brandText: {
        color: 'white',
    },

    input: {
        marginBottom: '5%',
    },
})
