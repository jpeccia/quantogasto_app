import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { registrarUsuario } from '../../services/api';
import { useState } from 'react';

export default function RegistroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [cargo, setCargo] = useState('');
  const [renda, setRenda] = useState('');

  const finalizarRegistro = async () => {
    if (!nome.trim() || !renda.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosUsuario = {
      nome,
      fotoPerfil,
      cargo,
      renda: parseFloat(renda),
    };

    try {
      await registrarUsuario(dadosUsuario);
      router.replace('/resumo');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full">
        <View className="glass p-6 rounded-2xl">
          <Text className="text-2xl font-bold text-primary mb-8">Cadastro</Text>

          <TextInput
            className="neomorph p-4 rounded-2xl w-full mb-4"
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            className="neomorph p-4 rounded-2xl w-full mb-4"
            placeholder="Cargo (opcional)"
            value={cargo}
            onChangeText={setCargo}
          />

          <TextInput
            className="neomorph p-4 rounded-2xl w-full mb-4"
            placeholder="Renda"
            keyboardType="numeric"
            value={renda}
            onChangeText={setRenda}
          />

          <TouchableOpacity
            className="bg-accent p-4 rounded-2xl shadow-lg w-full"
            onPress={finalizarRegistro}
          >
            <Text className="text-lg text-white text-center">Finalizar Cadastro</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}