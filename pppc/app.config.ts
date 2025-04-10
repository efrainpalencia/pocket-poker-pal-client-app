import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'pocket-poker-pal-client-app',
    slug: 'pocket-poker-pal-client-app',
    version: '1.0.0',
    extra: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
});
