import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import axios from 'axios';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
axios.defaults.baseURL = "https://api.themoviedb.org/3/"
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWJhMjQyNmU5MDIzNDBjYmUyOGFiNmFlMDdmYmU2NiIsIm5iZiI6MTcyMDE3MDI2Ny40MjQ2MTcsInN1YiI6IjY2ODdiNWViNDM5ZWMxOWZjMjFjZTRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AM_Y7_T6-kTZCWsaBkIiBydYfql5iKRMKMjUoF6v-4E";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login_screen" options={{ headerShown: false }} />
                <Stack.Screen name="detail_movie" options={{ headerShown: true, title: "Detail" }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>

  );
}
