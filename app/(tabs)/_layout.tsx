import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { COLORS } from "../../constants/AppConstants";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerTitleStyle: styles.headerTitle,
        headerTransparent: true,
        headerTintColor: COLORS.primary,
        headerShadowVisible: false,
        headerBlurEffect: "light",
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.tertiaryText,
        headerStyle: {
          backgroundColor: "transparent",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.OS === "ios" ? 85 : 100}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Overview",
          headerTitle: "Finance",
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabText, { color }]}>Overview</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "pie-chart" : "pie-chart-outline"}
              size={24}
              color={color}
              style={{ pointerEvents: "none" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerTitle: "Transactions",
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabText, { color }]}>Transactions</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "list" : "list-outline"}
              size={24}
              color={color}
              style={{ pointerEvents: "none" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Settings",
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabText, { color }]}>Settings</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
              style={{ pointerEvents: "none" }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "600",
    fontSize: 17,
  },
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === "ios" ? 85 : 65,
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
});
