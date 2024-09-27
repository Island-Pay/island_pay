import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { theme } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.purple,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.grey_deep, // Style the background color of the tab bar
          borderTopWidth: 0, // Remove border top
          height: 70, // Set height of the tab bar
          paddingBottom: 10, // Add padding for better alignment
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Font size for tab labels
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="credit-card" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="ellipsis-h" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
