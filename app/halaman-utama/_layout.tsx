import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar, View } from 'react-native';

export default function HalamanUtamaLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home/page" options={{ headerShown: false }} />
        <Stack.Screen name="history/page" options={{ headerShown: false }} />
        <Stack.Screen name="navigation/page" options={{ headerShown: false }} />
        <Stack.Screen name="profile/page" options={{ headerShown: false }} />
        <Stack.Screen name="wallet/page" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
