import { Buffer } from 'buffer';
import { AuthSession } from 'expo';
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

export default class Auth {
    oauth = {
        client_id: 4,
        domain: 'https://92794275.ngrok.io',
        redirect: AuthSession.getRedirectUrl(),

        pkce: {
            verifier: null,
            challenge: null,
            
            crypto_name: 'S256',
            crypto: Crypto.CryptoDigestAlgorithm.SHA256,
            encoding: Crypto.CryptoEncoding.BASE64,
        }
    }

    state = {
        user: null,
        token: {
            access: null,
            refresh: null,
        },
    }

    constructor() {
        console.log(this.oauth.redirect);
        // Return instance if exists.
        if (Auth.instance) {
            return Auth.instance;
        }

        // Save instance as singleton.
        return Auth.instance = this;
    }

    static async init() {
        // Create new auth instance.
        let auth = new Auth();

        // Load saved items from secure store.
        auth.load();
    }

    isAuthenticated() {
        return this.state.user;
    }

    async load() {
        this.state = await SecureStore.getItemAsync('auth_state');
    }

    async save() {
        return SecureStore.setItemAsync('auth_state', this.state);
    }

    async authorize() {
        // Generate new PKCE challenge.
        await this.generateChallenge();

        // Get authorization code from web.
        let code = await this.getCode();
        if (! code) return false;

        // Generate token from code.
        let token = await this.getToken(code);
        console.log(token);
        if (! token.access_token) return false;

        // Save token details in object state.
        this.state.token.access = token.access_token;
        this.state.token.refresh = token.refresh_token;

        // @wip - fetch user

        // @wip
        return true;
    }

    async refresh() {
        // @wip
    }

    replaces(str) {
        return str
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    
    async generateChallenge() {
        // Generate list of random bytes and convert to Base64.
        let bytes = await Random.getRandomBytesAsync(32);
        let verifier = this.replaces(Buffer.from(bytes).toString('base64'));

        // Create crypto based on verifier and convert to Base64.
        let challenge = this.replaces(await Crypto.digestStringAsync(
            this.oauth.pkce.crypto, verifier, { encoding: this.oauth.pkce.encoding }
        ));

        // Save pkce details in state.
        this.oauth.pkce.verifier = verifier;
        this.oauth.pkce.challenge = challenge;
    }

    async getCode() {
        let response = await AuthSession.startAsync({
            authUrl: this.oauth.domain + '/oauth/authorize' +
                '?response_type=code' +
                '&code_challenge=' + this.oauth.pkce.challenge +
                '&code_challenge_method=' + this.oauth.pkce.crypto_name +
                '&client_id=' + this.oauth.client_id +
                '&redirect_uri=' + encodeURIComponent(this.oauth.redirect)
        });

        return response && response.params && response.params.code;
    }

    async getToken(code, refresh = false) {
        let response = await fetch(this.oauth.domain + '/oauth/token', {
            method: 'POST',
            body: JSON.stringify({
                'code': (refresh ? undefined : code),
                'refresh_token': (refresh ? code : undefined),
                'grant_type': (refresh ? 'refresh_token' : 'authorization_code'),
                'client_id': this.oauth.client_id,
                'redirect_uri': this.oauth.redirect,
                'code_verifier': (refresh ? undefined : this.oauth.pkce.verifier),
            }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        });

        return await response.json();
    }
}
