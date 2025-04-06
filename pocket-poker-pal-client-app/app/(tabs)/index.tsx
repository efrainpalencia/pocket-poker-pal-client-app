import {StyleSheet, View} from 'react-native';
import {Container} from "../../components/Container";
import ImageViewer from "../../components/ImageViewer";
import {Image} from "expo-image";

const HeroImage = require("../../assets/images/ai-poker-hero-img-v1.2.png")
const HomeImage = require("../../assets/images/poker-home.jpg")
const BannerImage = require("../../assets/images/poker-bg.png")

export default function HomeScreen() {
  return (
    <>
        <Container>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={HeroImage} />
                <ImageViewer imgSource={HomeImage} />

                {/*<Image source={BannerImage} />*/}
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
        height: 700,
        width: '100%',
        alignItems: "center",
        backgroundColor: "white",
    }
});
