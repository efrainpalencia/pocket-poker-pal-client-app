import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

export function useSpeechToText() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Voice.onSpeechResults = (e) => {
            const result = e.value?.[0];
            if (result) setTranscript(result);
        };

        Voice.onSpeechError = (e) => {
            setError(e.error?.message || 'Speech error occurred');
            setIsListening(false);
        };

        Voice.onSpeechEnd = () => {
            setIsListening(false);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startListening = async () => {
        try {
            setTranscript('');
            setError(null);
            setIsListening(true);
            await Voice.start('en-US');
        } catch (err: any) {
            setError(err.message);
            setIsListening(false);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return {
        transcript,
        isListening,
        error,
        startListening,
        stopListening,
        reset: () => setTranscript(''),
    };
}
