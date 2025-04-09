import {Stack} from 'expo-router';
import React from 'react';
import {StatusBar, StyleSheet} from "react-native";

export default function RootLayout() {

    return (
        <>
        <StatusBar hidden={true} />
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="+not-found"
                options={{}}
            />
        </Stack>
        </>
    );
}

const styles = StyleSheet.create({
    position: {
        alignSelf: "center",
    }
})
