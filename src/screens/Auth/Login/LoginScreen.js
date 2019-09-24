import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import apollo from '@src/apollo.js';
import SafeView from '@components/SafeView.js';
import * as SecureStore from 'expo-secure-store';
import LOGIN_MUTATION from '@graphql/mutations/LoginMutation.gql.js'
import { Text, Input, Button, Layout } from 'react-native-ui-kitten';
import { View, Image, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default class LoginScreen extends React.Component {
    state = {
        username: 'demo',
        password: 'password',
    }

    password = React.createRef()

    submit = () => {
        apollo.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                username: this.state.username,
                password: this.state.password,
            },
        }).then(({ data: { login: { user, token } } }) => {
            // @wip
            SecureStore.setItemAsync('user', JSON.stringify(user));
            SecureStore.setItemAsync('token', token);

            // Navigate to the main app.
            this.props.navigation.navigate('Main');
        }).catch(error => {
            // @wip
            console.log(error)
        })
    }

    render = () => (
        <Layout style={s.background}>
            <SafeView style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={s.scroll}>
                        <View style={s.brand}>
                            <Image style={s.logo} source={require('@assets/icon.png')} />
                            <Text category="h3" style={s.brandText}>Zooium</Text>
                        </View>

                        <View style={s.form}>
                            <Input
                                value={this.state.username}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onChangeText={username => this.setState({ username })}
                                onSubmitEditing={() => this.password.current.focus()}
                                size="large"
                                textContentType="username"
                                placeholder={i18n.t('Username')}
                                style={s.input}
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
                                style={s.input}
                            />

                            <Button status="white" size="giant" onPress={this.submit} disabled={! this.state.username || ! this.state.password}>
                                {i18n.t('Login')}
                            </Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeView>
        </Layout>
    );
}

let s = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme['color-primary-500'],
    },

    scroll: {
        flexGrow: 1,
        justifyContent: 'space-around',
    },

    brand: {
        padding: '5%',
        alignItems: 'center',
    },

    form: {
        padding: '5%',
        justifyContent: 'center',
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
