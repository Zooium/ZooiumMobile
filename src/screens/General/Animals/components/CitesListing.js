import React from 'react';
import { Linking } from 'expo';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import PropTypes from 'prop-types';
import { Text } from '@ui-kitten/components';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function CitesListing({ listing, style = {} }) {
    return (
        <TouchableOpacity style={[s.listing, s['listing' + listing], style]} onPress={() => {
            // Check if NC listing.
            if (listing === 'NC') {
                return Alert.alert('CITES', i18n.t('cites.description.NC'));
            }

            // Return standard listing.
            Alert.alert('Appendix '+listing, i18n.t('cites.description.'+listing), [
                {
                    text: i18n.t('Read more'),
                    onPress: () => {
                        // Open CITES information.
                        Linking.openURL('https://www.cites.org/eng/disc/how.php');
                    },
                },
                {
                    text: i18n.t('Ok'),
                },
            ])
        }}>
            <Text category="p2" style={{ color: 'white' }}>
                {listing}
            </Text>
        </TouchableOpacity>
    );
}

CitesListing.propTypes = {
    listing: PropTypes.string.isRequired,
}

let s = StyleSheet.create({
    listing: {
        width: 25,
        height: 25,
        borderRadius: 25,
        
        alignItems: 'center',
        justifyContent: 'center',
    },

    listingI: {
        backgroundColor: '#93c2d9',
    },

    listingII: {
        backgroundColor: '#99c575',
    },

    listingIII: {
        backgroundColor: '#ffa366',
    },

    listingNC: {
        backgroundColor: theme['color-basic-500'],
    },
});
