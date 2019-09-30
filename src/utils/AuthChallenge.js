import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';

export default class AuthChallenge {
    static state = {
        verifier: null,
        challenge: null,
    }

    static settings = {
        crypto_name: 'S256',
        crypto: Crypto.CryptoDigestAlgorithm.SHA256,

        encoding_name: 'base64',
        encoding: Crypto.CryptoEncoding.BASE64,
    }

    static async generate() {
        // Generate list of random bytes and convert to encoding.
        let verifier = Buffer.from(await Random.getRandomBytesAsync(32))
            .toString(AuthChallenge.settings.encoding_name)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

        // Create crypto based on verifier and convert to ending.
        let challenge = await Crypto.digestStringAsync(
            AuthChallenge.settings.crypto, verifier, {
                encoding: AuthChallenge.settings.encoding
            },
        );

        // Remove special url chars from challenge.
        challenge = challenge
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

        // Save PKCE details in state.
        AuthChallenge.state.verifier = verifier;
        AuthChallenge.state.challenge = challenge;
    }
}
