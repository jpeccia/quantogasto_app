import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GastosScreen() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('fixo'); // 'fixo' ou 'variavel'

  const adicionarGasto = async () => {
    const token = await AsyncStorage.getItem('token');
    await axios.post(
      'http://sua-api.com/gastos',
      { nome, valor: parseFloat(valor), tipo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Gasto adicionado com sucesso!');
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <Text className="text-2xl font-bold text-primary mb-8">Adicionar Gasto</Text>

      <TextInput
        className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
        placeholder="Nome do gasto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity
        className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
        onPress={() => setTipo('fixo')}
      >
        <Text className="text-lg text-text text-center">Adicionar Gasto Fixo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white p-4 rounded-2xl shadow-lg w-full mb-4"
        onPress={() => setTipo('variavel')}
      >
        <Text className="text-lg text-text text-center">Adicionar Gasto Variável</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-accent p-4 rounded-2xl shadow-lg w-full"
        onPress={adicionarGasto}
      >
        <Text className="text-lg text-white text-center">Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}