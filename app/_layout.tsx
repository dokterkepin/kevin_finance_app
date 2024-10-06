import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
    NativeWindStyleSheet.setOutput({
        default: "native",
    });

    const [loaded, error] = useFonts({
        "Helvetica-Bold": require("../assets/fonts/Helvetica-Bold.ttf"),
        "Helvetica-Rounded": require("../assets/fonts/helvetica-rounded-bold-5871d05ead8de.otf"),
        "Helvetica": require("../assets/fonts/Helvetica.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;
