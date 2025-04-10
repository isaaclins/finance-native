import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to the home tab when the app starts
  // This will show the home screen with the bottom navigation bar
  return <Redirect href="/(tabs)/home" />;
}
