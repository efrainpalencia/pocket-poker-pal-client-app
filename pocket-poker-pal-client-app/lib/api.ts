import axios from 'axios';
import { BASE_API_URL } from '@env'

const API_BASE_URL = {BASE_API_URL};

export const sendAudioToBackend = async (uri: string): Promise<string> => {
    const formData = new FormData();

    formData.append('audio', {
        uri,
        name: 'recording.m4a',
        type: 'audio/m4a',
    } as any); // `as any` is often required in RN for FormData

    const response = await axios.post(`${API_BASE_URL}/ask-audio`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
