import { SafeAreaView, StyleSheet, ImageBackground } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
    }
})