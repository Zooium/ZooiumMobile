import i18n from '@src/i18n.js';
import { Alert } from 'react-native';

export default function DeletionConfirmation(name, callback) {
    return Alert.alert(
        i18n.t('Deletion Confirmation'),
        i18n.t('Are you sure you want to delete "{{name}}"?', { name }),
        [
            {
                text: i18n.t('Cancel'),
                style: 'cancel',
            },

            {
                text: i18n.t('Delete'),
                onPress: () => callback && callback(),
            },
        ],
    );
}
