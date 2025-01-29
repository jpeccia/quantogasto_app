import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';  // Usando o useRouter e useGlobalSearchParams do expo-router
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistrationOccupation() {
  const [occupation, setOccupation] = useState('');
  const router = useRouter();
  
  // Usando useGlobalSearchParams para acessar os parâmetros 'name' e 'photo'
  const { name, photo } = useGlobalSearchParams();  // Acessando os parâmetros 'name' e 'photo' da query

  const handleNext = () => {
    // Navegar para a próxima tela passando os parâmetros pela query
    router.push({
      pathname: '/income',  // Caminho para a próxima tela
      params: { name, photo, occupation },  // Passando os parâmetros 'name', 'photo' e 'occupation' pela query
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a1a1a' }}>
          Qual é a sua ocupação?
        </Text>
        <TextInput
          style={{
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
          placeholder="Sua ocupação"
          value={occupation}
          onChangeText={setOccupation}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#3b82f6',
            padding: 16,
            borderRadius: 8,
            marginBottom: 8,
          }}
          onPress={handleNext}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            Continuar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#3b82f6',
          }}
          onPress={handleNext}
        >
          <Text style={{ color: '#3b82f6', fontWeight: 'bold', textAlign: 'center' }}>
            Pular
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
