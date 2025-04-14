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
        bundleIdentifier: 'com.efrai.pocketpokerpal',
        buildNumber: '1.0.0',
    },
    android: {
        package: 'com.efrai.pocketpokerpal',
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: './assets/images/poker-chip.png',
            backgroundColor: '#ffffff',
        },
    },
    web: {
        favicon: './assets/favicon.png',
    },
    runtimeVersion: {
        policy: 'appVersion',
    },
    extra: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
});
