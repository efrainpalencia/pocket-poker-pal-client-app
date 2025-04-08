import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export const sendAudioToBackend = async (uri: string): Promise<string> => {
    const formData = new FormData();

    formData.append('audio', {
        uri,
        name: 'recording.m4a',
        type: 'audio/m4a',
    } as any); // required for React Native

    try {
        const response = await axios.post(`${API_BASE_URL}/ask-audio`, formData, {
            headers: {
                Accept: 'application/json',
                // Do NOT set Content-Type here; axios does it automatically with boundary
            },
        });

        return response.data.text ?? response.data.answer ?? "✅ Transcribed successfully";
    } catch (error: any) {
        console.error('❌ Audio upload failed:', error?.response?.data || error.message);
        throw error;
    }
};
