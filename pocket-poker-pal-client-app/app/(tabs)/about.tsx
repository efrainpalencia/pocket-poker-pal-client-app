import { Container } from "../../components/Container";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView
} from "react-native";

const backgroundImage = require('../../assets/images/poker-bg.png');

export default function About() {
    return (
        <Container>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.heading}>♠️ About Pocket Poker Pal</Text>
                        <Text style={styles.paragraph}>
                            Your Ultimate Poker Rules Assistant—Whether You’re Dealing, Managing, or Playing the Game.
                        </Text>

                        <Text style={styles.paragraph}>
                            Pocket Poker Pal is a voice-powered AI app designed to bring instant clarity to poker rulings—on the floor, in training, or during gameplay. Whether you're a poker room staff member, tournament director, or a player, this tool helps you find accurate, rulebook-backed answers when it matters most.
                        </Text>

                        <Text style={styles.subheading}>🎙 Speak or Type Your Question</Text>
                        <Text style={styles.paragraph}>
                            Use your voice or keyboard—Pocket Poker Pal listens, understands, and responds instantly.
                        </Text>

                        <Text style={styles.subheading}>📚 Backed by Official Rulebooks</Text>
                        <Text style={styles.paragraph}>
                            We’ve embedded trusted sources like the TDA Poker Rules and Seminole Poker Rule Book into our AI. Every response is grounded in real-world, professional standards.
                        </Text>

                        <Text style={styles.subheading}>👨‍💼 For Industry Pros</Text>
                        <Text style={styles.paragraph}>
                            • Floor Staff & Dealers: Resolve disputes fast and confidently.{"\n"}
                            • Supervisors & Trainers: Use as a teaching aid for new hires.{"\n"}
                            • Tournament Directors: Reference rulings without flipping through physical documents.
                        </Text>

                        <Text style={styles.subheading}>🧠 For Players</Text>
                        <Text style={styles.paragraph}>
                            • Learn advanced rulings and procedures used in real casinos and tournament settings.{"\n"}
                            • Understand the reasoning behind floor decisions to improve your own gameplay.
                        </Text>

                        <Text style={styles.subheading}>💡 Features You'll Love</Text>
                        <Text style={styles.paragraph}>
                            💬 Conversational Chat Interface{"\n"}
                            🤖 Accurate AI Answers Based on Real Rulebooks{"\n"}
                            🔍 Searchable Memory of Past Questions{"\n"}
                            🎙 Voice Input for Fast, Hands-Free Use{"\n"}
                            📱 Clean, Minimal Design Built for Mobile
                        </Text>

                        <Text style={styles.paragraph}>
                            Whether you're managing a room, training a team, running a tournament, or sitting at the felt, Pocket Poker Pal helps ensure consistent rulings and informed decisions.
                        </Text>

                        <Text style={styles.paragraph}>
                            Professional or recreational—if you’re around poker, Pocket Poker Pal is built for you.
                        </Text>
                    </ScrollView>
                </View>
            </ImageBackground>
        </Container>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 16,
        borderRadius: 8,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 20,
        fontWeight: '600',
        color: '#10B981',
        marginTop: 20,
        marginBottom: 6,
    },
    paragraph: {
        fontSize: 16,
        color: '#ddd',
        lineHeight: 24,
        marginBottom: 12,
    },
});
