import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function RegistroScreen() {
  const router = useRouter();
  const [etapa, setEtapa] = useState('nome'); // 'nome', 'perfil', 'cargo', 'renda'

  const avancarEtapa = () => {
    if (etapa === 'nome') setEtapa('perfil');
    else if (etapa === 'perfil') setEtapa('cargo');
    else if (etapa === 'cargo') setEtapa('renda');
    else if (etapa === 'renda') router.replace('/resumo');
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Stack.Screen options={{ headerShown: false }} />

      {etapa === 'nome' && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
          <Text className="text-2xl font-bold text-primary mb-8">Qual é o seu nome?</Text>
          <TextInput
            className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
            placeholder="Nome"
          />
          <TouchableOpacity
            className="bg-accent p-4 rounded-2xl shadow-lg w-full"
            onPress={avancarEtapa}
          >
            <Text className="text-lg text-white text-center">Avançar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {etapa === 'perfil' && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
          <Text className="text-2xl font-bold text-primary mb-8">Adicione uma foto de perfil (opcional)</Text>
          <TouchableOpacity
            className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
            onPress={() => console.log('Abrir seletor de fotos')}
          >
            <Text className="text-lg text-text text-center">Escolher Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-accent p-4 rounded-2xl shadow-lg w-full"
            onPress={avancarEtapa}
          >
            <Text className="text-lg text-white text-center">Pular</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {etapa === 'cargo' && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
          <Text className="text-2xl font-bold text-primary mb-8">Qual é o seu cargo? (opcional)</Text>
          <TextInput
            className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
            placeholder="Cargo"
          />
          <TouchableOpacity
            className="bg-accent p-4 rounded-2xl shadow-lg w-full"
            onPress={avancarEtapa}
          >
            <Text className="text-lg text-white text-center">Pular</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {etapa === 'renda' && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
          <Text className="text-2xl font-bold text-primary mb-8">Qual é a sua renda mensal?</Text>
          <TextInput
            className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
            placeholder="Renda"
            keyboardType="numeric"
          />
          <TouchableOpacity
            className="bg-accent p-4 rounded-2xl shadow-lg w-full"
            onPress={avancarEtapa}
          >
            <Text className="text-lg text-white text-center">Finalizar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}