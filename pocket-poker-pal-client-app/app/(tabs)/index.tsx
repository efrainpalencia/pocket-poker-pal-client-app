import {StyleSheet, View, Text} from 'react-native';
import {Container} from "../../components/Container";
import ImageViewer from "../../components/ImageViewer";

const HeroImage = require('../../assets/images/ai-poker-hero-img-v1.2.png')
const HomeImage = require('../../assets/images/poker-bg-500.jpg')
const BannerImage = require('../../assets/images/turn-on-2914934_640.jpg')

export default function HomeScreen() {
  return (
    <>
        <Container>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={HeroImage} />
            </View>
            <View style={styles.bannerImageContainer}>
                <ImageViewer imgSource={BannerImage} />
            </View>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={HomeImage} />
            </View>
        </Container>
    </>
  );
}

const styles = StyleSheet.create({

    text: {
        color: "white",
    },
    button: {
        fontSize: 25,
        textDecorationLine: 'underline',
        color: "white",
    },
    imageContainer: {
        flex: 1,
        height: 300,
        width: '100%',
        alignItems: "center",
    },
    bannerImageContainer: {
        flex: 1,
        height: 100,
        width: '100%',
        alignItems: "center",
    }
});
