import 'dotenv/config';

export default {
    expo: {
        name: "PocketPokerPalClientApp",
        slug: "pocket-poker-pal-client-app",
        extra: {
            API_URL: process.env.BASEAPI_URL,
        },
    },
};
