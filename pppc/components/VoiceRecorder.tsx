import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { sendAudioToBackend } from '@/services/api';

export default function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState<number | null>(null);
    const [recordedUri, setRecordedUri] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<string | null>(null);
    const [isTranscribing, setIsTranscribing] = useState(false);

    const recordingRef = useRef<Audio.Recording | null>(null);

    const recordingOptions: Audio.RecordingOptions = {
        android: {
            extension: '.m4a',
            outputFormat: 2,
            audioEncoder: 3,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.m4a',
            audioQuality: 2,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
        web: {
            mimeType: 'audio/webm',
            bitsPerSecond: 128000,
        },
    };

    const startRecording = async () => {
        try {
            console.log('Requesting permissions...');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');
            const recording = new Audio.Recording();

            await recording.prepareToRecordAsync(recordingOptions);
            recording.setOnRecordingStatusUpdate((status) => {
                if (status.isRecording) {
                    setRecordingDuration(status.durationMillis ?? null);
                }
            });

            await recording.startAsync();
            recordingRef.current = recording;
            setIsRecording(true);
            setTranscript(null);
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording...');
        if (!recordingRef.current) return;

        try {
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();
            setRecordedUri(uri || null);
            setIsRecording(false);
            console.log('Recording saved to:', uri);

            if (uri) {
                setIsTranscribing(true);
                try {
                    const result = await sendAudioToBackend(uri);
                    setTranscript(result);
                } catch (error) {
                    setTranscript('❌ Failed to transcribe audio.');
                } finally {
                    setIsTranscribing(false);
                }
            }
        } catch (err) {
            console.error('Failed to stop recording:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isRecording
                    ? `🎙️ Recording... ${((recordingDuration ?? 0) / 1000).toFixed(1)}s`
                    : 'Press to start recording'}
            </Text>

            <Button
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                onPress={isRecording ? stopRecording : startRecording}
                color={isRecording ? '#EF4444' : '#10B981'}
            />

            {isTranscribing && <ActivityIndicator style={{ marginTop: 12 }} color="#10B981" />}

            {recordedUri && (
                <Text style={styles.text}>
                    ✅ Recorded File: {recordedUri}
                </Text>
            )}

            {transcript && (
                <View style={styles.transcriptBox}>
                    <Text style={styles.transcriptLabel}>🧠 Transcription:</Text>
                    <Text style={styles.transcriptText}>{transcript}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginBottom: 12,
        fontSize: 16,
        color: '#fff',
    },
    transcriptBox: {
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#1e1e1e',
        width: '100%',
    },
    transcriptLabel: {
        fontWeight: 'bold',
        color: '#10B981',
        marginBottom: 4,
    },
    transcriptText: {
        color: '#fff',
        fontSize: 16,
    },
});
