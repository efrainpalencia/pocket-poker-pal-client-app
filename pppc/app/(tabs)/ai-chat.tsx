import {Container} from "../../components/Container";
import {StyleSheet, Text, View, ImageBackground} from "react-native";
import VoiceChatScreen from "../../components/ui/VoiceChatScreen";
import React from "react";

const backgroundImage = require("../../assets/images/poker-bg.png")

export default function AiChat () {

    return (
        <>
            <Container>
                <ImageBackground
                    source={backgroundImage}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <View style={styles.overlay}>
                        <VoiceChatScreen />
                    </View>
                </ImageBackground>

            </Container>


        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)', // optional overlay for readability

        width: '100%',
        height: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});