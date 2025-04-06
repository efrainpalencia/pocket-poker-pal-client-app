import {Container} from "../../components/Container";
import {StyleSheet, Text, View, ImageBackground} from "react-native";

const backgroundImage = require('../../assets/images/poker-bg.png')

export default function About() {
    return (
        <>
            <Container>
                <ImageBackground
                    source={backgroundImage}
                    resizeMode="cover"
                    style={styles.background}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.text}>About Page</Text>
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
        padding: 20,
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});