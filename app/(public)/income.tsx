import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useGlobalSearchParams } from 'expo-router';  // Usando expo-router para navegação

export default function RegistrationIncome() {
  const [income, setIncome] = useState('');
  const router = useRouter();
  
  // Usando useSearchParams para acessar os parâmetros da URL
  const { name, photo, occupation } = useGlobalSearchParams();  // Acessando os parâmetros 'name', 'photo', 'occupation'

  const handleNext = () => {
    const incomeValue = parseFloat(income);
    if (incomeValue > 0) {
      // Navegar para a página "Summary" passando os parâmetros pela query
      router.push({
        pathname: '/summary',  // Caminho para a página "Summary"
        params: { name, photo, occupation, income: incomeValue.toString() },  // Passando os parâmetros pela query
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a1a1a' }}>
          Qual é a sua renda mensal?
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
          placeholder="Sua renda"
          value={income}
          onChangeText={setIncome}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 8,
            backgroundColor: parseFloat(income) > 0 ? '#3b82f6' : '#ccc',
          }}
          disabled={!(parseFloat(income) > 0)}
          onPress={handleNext}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            Finalizar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}