import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext'; // Contexto de autenticação
import React, { useState, useEffect } from 'react';
import { getFinancialSummary } from '../../lib/api'; // Função para buscar o resumo financeiro

export default function FinancialSummary() {
  const router = useRouter();
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFinancialSummary = async () => {
      try {
        const data = await getFinancialSummary();
        console.log('Dados financeiros carregados:', data); // Debugging
        if (data) {
          setFinancialData(data);
        } else {
          setError('Nenhum dado financeiro encontrado.');
        }
      } catch (err) {
        setError('Erro ao carregar os dados financeiros. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      loadFinancialSummary();
    }
  }, [user?.token]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error || !financialData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-6">
        <Text className="text-red-500 font-bold text-center">{error || 'Erro desconhecido.'}</Text>
      </SafeAreaView>
    );
  }

  // Se os dados estiverem disponíveis
  const income = financialData?.renda || 0;
  const fixedExpenses = financialData?.gastosFixos || 0;
  const variableExpenses = financialData?.gastosVariaveis || 0;
  const balance = income - fixedExpenses - variableExpenses;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">Resumo Financeiro</Text>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500"
            >
              {user?.photo ? (
                <Image source={{ uri: user.photo }} className="w-full h-full" />
              ) : (
                <View className="w-full h-full bg-blue-100 items-center justify-center">
                  <Text className="text-blue-500 font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Card de Saldo */}
          <View className="bg-blue-500 p-6 rounded-lg mb-6">
            <Text className="text-white text-sm mb-2">Saldo Disponível</Text>
            <Text className="text-white text-3xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(balance)}
            </Text>
          </View>

          {/* Cards de Renda e Gastos Totais */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-white p-4 rounded-lg">
              <Text className="text-gray-600 text-sm mb-1">Renda</Text>
              <Text className="text-green-600 font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(income)}
              </Text>
            </View>

            <View className="flex-1 bg-white p-4 rounded-lg">
              <Text className="text-gray-600 text-sm mb-1">Gastos Totais</Text>
              <Text className="text-red-600 font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(fixedExpenses + variableExpenses)}
              </Text>
            </View>
          </View>

          {/* Detalhamento dos Gastos */}
          <Text className="text-xl font-bold mb-4 text-gray-800">Detalhamento</Text>

          <View className="bg-white rounded-lg p-4 mb-4">
            <Text className="text-gray-600 mb-2">Gastos Fixos</Text>
            <Text className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(fixedExpenses)}
            </Text>
          </View>

          <View className="bg-white rounded-lg p-4">
            <Text className="text-gray-600 mb-2">Gastos Variáveis</Text>
            <Text className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(variableExpenses)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
