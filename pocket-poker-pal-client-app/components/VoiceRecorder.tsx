import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState<number | null>(null);
    const [recordedUri, setRecordedUri] = useState<string | null>(null);

    const recordingRef = useRef<Audio.Recording | null>(null);

    const recordingOptions: Audio.RecordingOptions = {
        android: {
            extension: '.m4a',
            outputFormat: 2, // MPEG_4
            audioEncoder: 3, // AAC
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.m4a',
            audioQuality: 2, // High
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
        } catch (err) {
            console.error('Failed to stop recording:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isRecording
                    ? `Recording... Duration: ${(recordingDuration ?? 0) / 1000}s`
                    : 'Press to start recording'}
            </Text>

            <Button
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                onPress={isRecording ? stopRecording : startRecording}
                color={isRecording ? '#EF4444' : '#10B981'}
            />

            {recordedUri && (
                <Text style={styles.text}>
                    ✅ Recorded File: {recordedUri}
                </Text>
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
});
