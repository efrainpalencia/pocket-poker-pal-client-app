// api.ts
import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export const askQuestion = async (question: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ask`, { question });

        // If backend returns { answer: "..." }
        if (response.data && typeof response.data.answer === 'string') {
            return response.data.answer;
        }

        throw new Error('Invalid response format');
    } catch (error) {
        console.error('askQuestion error:', error);
        // console.error("API_BASE_URL: " + API_BASE_URL); // debug url
        throw new Error('❌ Could not get answer from backend.');
    }
};
