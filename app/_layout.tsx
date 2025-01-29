import { AuthProvider } from "@/contexts/AuthContext";
import { Slot, Stack } from "expo-router";
import { View, Text } from "react-native";  // Certifique-se de importar Text também
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>  {/* Envolvendo a aplicação com o AuthProvider */}
      <View className="flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      </View>
    </AuthProvider>
  );
}
