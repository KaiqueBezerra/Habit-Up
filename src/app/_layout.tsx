import { View } from "react-native";
import "../styles/global.css";

import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <View>
      <View>
        <Slot />
      </View>
    </View>
  );
}
