import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    name: 'Pocket Poker Pal',
    slug: 'pocket-poker-pal-client-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/poker-chip.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/images/poker-chip.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
    },
    android: {
        package: 'com.efrai.pocketpokerpal',
        versionCode: 1,
    },
    web: {
        favicon: './assets/favicon.png',
    },
    extra: {
        API_BASE_URL: process.env.API_BASE_URL,
        eas: {
            projectId: 'b2cb439c-4c3a-4058-a1f5-969af90b87f8',
        },
    },
});
