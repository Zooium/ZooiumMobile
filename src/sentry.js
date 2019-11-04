import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { SENTRY_DSN } from 'react-native-dotenv';

export default Sentry.init({
    dsn: SENTRY_DSN,
});

Sentry.setRelease(Constants.manifest.revisionId);
