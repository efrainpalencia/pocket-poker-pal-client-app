import React, { useState, useRef, useEffect } from 'react';
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
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { askQuestion } from '@/services/api';
import { useSpeechToText } from '@/hooks/useSpeechToText';

type Message = {
    role: 'user' | 'assistant';
    text: string;
};

export default function VoiceChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    const {
        transcript,
        isListening,
        error,
        startListening,
        stopListening,
        reset,
    } = useSpeechToText();

    useEffect(() => {
        if (transcript) {
            setInput(transcript); // Allow editing before sending
        }
    }, [transcript]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', text: input };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);
        scrollToBottom();

        try {
            const answer = await askQuestion(userMessage.text);
            const assistantMessage: Message = { role: 'assistant', text: answer };
            const updatedMessages: Message[] = [...newMessages, assistantMessage];
            setMessages(updatedMessages);
            scrollToBottom();
        } catch (err) {
            const errorMessage: Message = { role: 'assistant', text: '❌ Error getting response.' };
            const errorMessages: Message[] = [...newMessages, errorMessage];
            setMessages(errorMessages);
            scrollToBottom();
        } finally {
            setIsTyping(false);
            reset();
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
        setIsTyping(false);
        setShowResetModal(false);
        reset();
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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {messages.length === 0 ? (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderText}>🤖 Do you have a poker question?</Text>
                        </View>
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={styles.chatContainer}
                            onContentSizeChange={scrollToBottom}
                        />
                    )}

                    {isTyping && <Text style={styles.typingText}>🧠 PokerPal is typing...</Text>}
                    {isListening && <Text style={styles.listeningText}>🎙️ Listening...</Text>}
                    {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

                    <View style={styles.inputBar}>
                        <TouchableOpacity onPress={isListening ? stopListening : startListening}>
                            <Ionicons
                                name={isListening ? 'stop-circle' : 'mic'}
                                size={28}
                                color={isListening ? '#EF4444' : '#10B981'}
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
                                    <TouchableOpacity onPress={confirmReset} style={styles.confirmButton}>
                                        <Text style={styles.confirmText}>Yes, Reset</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    // your existing styles...
    container: { flex: 1, backgroundColor: '#121212' },
    chatContainer: { padding: 5 },
    message: { padding: 12, borderRadius: 12, marginVertical: 6 },
    userMessage: { backgroundColor: '#2a2a2a', alignSelf: 'flex-end' },
    assistantMessage: { backgroundColor: '#1f2937', alignSelf: 'flex-start' },
    messageText: { color: '#fff', fontSize: 16 },
    typingText: { textAlign: 'center', color: '#aaa', fontStyle: 'italic', marginBottom: 4 },
    listeningText: { textAlign: 'center', color: '#10B981', fontStyle: 'italic', marginBottom: 4 },
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
    modalTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 8 },
    modalText: { color: '#aaa', fontSize: 15, marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
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
    cancelText: { color: '#ccc', fontSize: 15 },
    confirmText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
