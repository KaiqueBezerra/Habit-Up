import { Tabs } from "expo-router";
import {
    ChartColumn,
    CircleUserRound,
    House,
    NotebookPen,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#09090B",
          borderTopColor: "#27272A",
        },

        tabBarActiveTintColor: "#10B981",

        tabBarInactiveTintColor: "#71717A",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",

          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="habits"
        options={{
          title: "Hábitos",

          tabBarIcon: ({ color, size }) => (
            <NotebookPen color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "Estatísticas",

          tabBarIcon: ({ color, size }) => (
            <ChartColumn color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",

          tabBarIcon: ({ color, size }) => (
            <CircleUserRound color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
