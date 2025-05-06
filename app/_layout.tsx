import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Start with loading screen */}
        <Stack.Screen name="halaman-awal/loadingscreen" options={{ headerShown: false }} />
        {/* Welcome screen */}
        <Stack.Screen name="halaman-awal/welcome" options={{ headerShown: false }} />
        {/* Registration screen */}
        <Stack.Screen name="halaman-awal/daftar" options={{ headerShown: false }} />
        {/* Login screen */}
        <Stack.Screen name="halaman-awal/login" options={{ headerShown: false }} />
        {/* Other screens */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
