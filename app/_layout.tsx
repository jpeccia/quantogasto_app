import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-gray-900">
      <Stack />
    </View>
  );
}