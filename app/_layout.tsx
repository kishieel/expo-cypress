import FontFamily from '@app/constants/FontFamily';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(console.error);

export default function RootLayout() {
    const [loaded, error] = useFonts({
        [FontFamily.MPlusRounded1cMedium]: require('@app/assets/fonts/mplusrounded1c_medium.ttf'),
        [FontFamily.MPlusRounded1cBlack]: require('@app/assets/fonts/mplusrounded1c_black.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().catch(console.error);
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        </Stack>
    );
}
