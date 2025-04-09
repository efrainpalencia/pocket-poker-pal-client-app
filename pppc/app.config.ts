import 'dotenv/config';

export default {
    expo: {
        name: 'PocketPokerPalClientApp',
        slug: 'pocket-poker-pal-client-app',
        android: {
            package: 'com.efrai.pocketpokerpal', // ✅ Add your unique app ID here
        },
        extra: {
            API_URL: process.env.BASEAPI_URL,
        },
    },
};
