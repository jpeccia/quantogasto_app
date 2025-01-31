import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResumoScreen() {
  const [resumo, setResumo] = useState({ renda: 0, gastosFixos: 0, gastosVariaveis: 0, saldo: 0 });

  useEffect(() => {
    const fetchResumo = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://sua-api.com/resumo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumo(response.data);
    };

    fetchResumo();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-2xl font-bold text-primary mb-8">Resumo Financeiro</Text>

      <View className="bg-white p-6 rounded-2xl shadow-lg w-full mb-4">
        <Text className="text-lg text-text">Renda Total: R$ {resumo.renda.toFixed(2)}</Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-lg w-full mb-4">
        <Text className="text-lg text-text">Gastos Fixos: R$ {resumo.gastosFixos.toFixed(2)}</Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-lg w-full mb-4">
        <Text className="text-lg text-text">Gastos Variáveis: R$ {resumo.gastosVariaveis.toFixed(2)}</Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-lg w-full">
        <Text className="text-lg text-text">Saldo Disponível: R$ {resumo.saldo.toFixed(2)}</Text>
      </View>
    </View>
  );
}