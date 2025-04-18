import { useEffect, useState, useRef } from 'react';
import Voice from '@react-native-voice/voice';

export function useSpeechToText() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        Voice.onSpeechResults = (e) => {
            if (e.value?.[0]) {
                setTranscript(e.value[0]);
                resetTimeout(); // Restart timeout on new input
            }
        };

        Voice.onSpeechPartialResults = (e) => {
            if (e.value?.[0]) {
                setTranscript(e.value[0]);
                resetTimeout();
            }
        };

        Voice.onSpeechError = (e) => {
            setError(e.error?.message || 'Speech error occurred');
            setIsListening(false);
            clearTimeoutIfNeeded();
        };

        Voice.onSpeechEnd = () => {
            setIsListening(false);
            clearTimeoutIfNeeded();
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            clearTimeoutIfNeeded();
        };
    }, []);

    const resetTimeout = () => {
        clearTimeoutIfNeeded();
        timeoutRef.current = setTimeout(() => {
            stopListening(); // fallback stop
        }, 30000); // 30 seconds of inactivity
    };

    const clearTimeoutIfNeeded = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const startListening = async () => {
        try {
            setTranscript('');
            setError(null);
            setIsListening(true);
            await Voice.start('en-US');
            resetTimeout(); // Start the fallback timer
        } catch (err: any) {
            setError(err.message);
            setIsListening(false);
            clearTimeoutIfNeeded();
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
            clearTimeoutIfNeeded();
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
        reset: () => {
            setTranscript('');
            clearTimeoutIfNeeded();
        },
    };
}
