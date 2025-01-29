import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import { View, Text } from "react-native";  // Certifique-se de importar Text também
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>  {/* Envolvendo a aplicação com o AuthProvider */}
      <View className="flex-1 bg-gray-900">
        {/* Exemplo de uso correto do texto */}
        <Text className="text-white">Bem-vindo ao App!</Text>  
        <Slot />  {/* Renderiza a navegação */}
      </View>
    </AuthProvider>
  );
}
