import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import { View } from "react-native";
import '../global.css';

export default function RootLayout() {
  return (
    <View className="flex-1 bg-gray-900">
      <Slot/>
    </View>
  );
}