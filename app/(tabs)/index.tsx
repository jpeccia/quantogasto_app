import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-3xl font-bold text-primary mb-8">Bem-vindo ao QuantoGasto!</Text>

      <Link href="/resumo" asChild>
        <TouchableOpacity className="bg-white p-6 rounded-2xl shadow-lg w-full mb-4">
          <Text className="text-lg font-semibold text-center text-text">Ver Resumo</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/gastos" asChild>
        <TouchableOpacity className="bg-white p-6 rounded-2xl shadow-lg w-full">
          <Text className="text-lg font-semibold text-center text-text">Adicionar Gastos</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}