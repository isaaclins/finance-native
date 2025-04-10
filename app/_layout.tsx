import { Stack } from "expo-router";
import { TransactionProvider } from "../context/TransactionContext";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </TransactionProvider>
  );
}
