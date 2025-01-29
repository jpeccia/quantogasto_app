// screens/RegistrationSummary.tsx

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useGlobalSearchParams } from 'expo-router';  // Usando expo-router para navegação
import { createUser } from '../../lib/api';  // Importando a função da API
import { useState } from 'react';

export default function RegistrationSummary() {
  const router = useRouter();
  
  // Usando useGlobalSearchParams para acessar os parâmetros da URL
  const { name, photo, occupation, income } = useGlobalSearchParams();  // Acessando os parâmetros 'name', 'photo', 'occupation', 'income'

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Garantir que os parâmetros sejam do tipo string (não string[])
  const userName = Array.isArray(name) ? name[0] : name; // Se name for um array, pega o primeiro item
  const userPhoto = Array.isArray(photo) ? photo[0] : photo; // Verificar photo também
  const userOccupation = Array.isArray(occupation) ? occupation[0] : occupation; // Verificar occupation
  const userIncome = Array.isArray(income) ? income[0] : income; // Verificar income

  // Definindo parsedIncome
  const parsedIncome = parseFloat(userIncome || '0');  // Convertendo 'userIncome' para número

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    // Certifique-se de que os parâmetros não sejam indefinidos
    if (!userName || isNaN(parsedIncome)) {
      setError('Nome e Renda são obrigatórios para iniciar!');
      setLoading(false);
      return;
    }

    try {
      const response = await createUser({
        nome: userName,                  // 'nome' como string
        foto_perfil: userPhoto!,         // 'foto_perfil' como string
        cargo: userOccupation || '',     // 'cargo' como string (pode ser vazio)
        renda: parsedIncome,             // 'renda' como número
      });

      if (response.token) {
        console.log('Conta criada com sucesso!', response);
        // Navegar para a tela principal após a criação da conta
        router.push('/home');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a1a1a' }}>
          Resumo
        </Text>
        
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          {userPhoto && (
            <Image
              source={{ uri: userPhoto }} // Verificando se é um array e pegando o primeiro item
              style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16, alignSelf: 'center' }}
            />
          )}
          
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#666' }}>Nome:</Text>
            <Text style={{ fontSize: 18 }}>{userName}</Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#666' }}>Ocupação:</Text>
            <Text style={{ fontSize: 18 }}>{userOccupation || 'Não informado'}</Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#666' }}>Renda Mensal:</Text>
            <Text style={{ fontSize: 18 }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(parsedIncome)}
            </Text>
          </View>
        </View>

        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={{ padding: 16, backgroundColor: '#3b82f6', borderRadius: 8 }}
          onPress={handleStart}
          disabled={loading}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>
            {loading ? 'Criando...' : 'Começar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
