import { Link, Stack } from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from "../components/Container";



export default function NotFoundScreen() {
  return (
    <>
      <Container>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.button}>
          <Text>Go to home screen!</Text>
        </Link>
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
});
