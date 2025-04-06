import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

export default function VoiceChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUri, setRecordedUri] = useState<string | null>(null);
    const [recordingDuration, setRecordingDuration] = useState<number | null>(null);
    const [showResetModal, setShowResetModal] = useState(false);

    const recordingRef = useRef<Audio.Recording | null>(null);
    const flatListRef = useRef<FlatList>(null);

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
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
            });

            recording.setOnRecordingStatusUpdate((status) => {
                if (status.isRecording) {
                    setRecordingDuration(status.durationMillis ?? null);
                }
            });

            await recording.startAsync();
            recordingRef.current = recording;
            setIsRecording(true);
            setIsListening(true);
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    };

    const stopRecording = async () => {
        if (!recordingRef.current) return;

        try {
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();
            setRecordedUri(uri || null);
            setIsRecording(false);
            setIsListening(false);
            console.log('Recording saved to:', uri);
        } catch (err) {
            console.error('Failed to stop recording:', err);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);
        scrollToBottom();

        try {
            const response = await fetch('http://localhost:8080/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });

            const data = await response.json();
            setMessages([...newMessages, { role: 'assistant', text: data.answer }]);
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', text: '❌ Error getting response' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const confirmReset = () => {
        setMessages([]);
        setInput('');
        setRecordedUri(null);
        setIsTyping(false);
        setIsListening(false);
        setShowResetModal(false);
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            style={[
                styles.message,
                item.role === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {messages.length === 0 ? (
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>
                        🤖 Do you have a poker question?
                    </Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.chatContainer}
                />
            )}

            {isTyping && <Text style={styles.typingText}>🧠 PokerPal is typing...</Text>}
            {isListening && <Text style={styles.listeningText}>🎙️ Listening...</Text>}

            <View style={styles.inputBar}>
                <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
                    <Ionicons
                        name={isRecording ? 'stop-circle' : 'mic'}
                        size={28}
                        color={isRecording ? '#EF4444' : '#10B981'}
                    />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={input}
                    placeholder="Ask something..."
                    placeholderTextColor="#aaa"
                    onChangeText={setInput}
                />

                <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {recordedUri && (
                <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
                    ✅ Audio saved at: {recordedUri}
                </Text>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={() => setShowResetModal(true)}>
                <Text style={styles.resetButtonText}>🔄 Start Over</Text>
            </TouchableOpacity>

            <Modal transparent={true} visible={showResetModal} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Reset Conversation?</Text>
                        <Text style={styles.modalText}>This will clear all messages.</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setShowResetModal(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={confirmReset}
                                style={styles.confirmButton}
                            >
                                <Text style={styles.confirmText}>Yes, Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    chatContainer: { padding: 5 },
    message: { padding: 12, borderRadius: 12, marginVertical: 6 },
    userMessage: {
        backgroundColor: '#2a2a2a',
        alignSelf: 'flex-end',
    },
    assistantMessage: {
        backgroundColor: '#1f2937',
        alignSelf: 'flex-start',
    },
    messageText: { color: '#fff', fontSize: 16 },
    typingText: {
        textAlign: 'center',
        color: '#aaa',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    listeningText: {
        textAlign: 'center',
        color: '#10B981',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    iconButton: { paddingHorizontal: 8 },
    input: {
        flex: 1,
        color: '#fff',
        paddingHorizontal: 12,
        fontSize: 16,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    placeholderText: {
        fontSize: 18,
        color: '#aaa',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    resetButton: {
        margin: 12,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        borderRadius: 8,
    },
    resetButtonText: {
        color: '#10B981',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContainer: {
        backgroundColor: '#1f1f1f',
        padding: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 360,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    modalText: {
        color: '#aaa',
        fontSize: 15,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#374151',
    },
    confirmButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#EF4444',
    },
    cancelText: {
        color: '#ccc',
        fontSize: 15,
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});
