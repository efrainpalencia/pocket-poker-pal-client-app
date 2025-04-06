import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type Props = {
    imgSource: any;
}

export default function ImageViewer({ imgSource }: Props) {
    return (
        <Image source={imgSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        maxWidth: 500,
        height: '100%',
        maxHeight: 322,
    },
});

