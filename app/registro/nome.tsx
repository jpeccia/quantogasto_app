import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useState } from 'react';

export default function NomeScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  const avancarEtapa = () => {
    if (nome.trim()) {
      router.push('/');
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
        <Text className="text-2xl font-bold text-primary mb-8">Qual é o seu nome?</Text>
        <TextInput
          className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity
          className="bg-accent p-4 rounded-2xl shadow-lg w-full"
          onPress={avancarEtapa}
        >
          <Text className="text-lg text-white text-center">Avançar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}