import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useGlobalSearchParams, useRouter,  } from 'expo-router';  
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function RegistrationPhoto() {
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const router = useRouter();
  

  const { name } = useGlobalSearchParams();  

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    // Navegar para a próxima tela passando os parâmetros pela query
    router.push({
      pathname: '/occupation',  // Caminho da próxima tela
      params: { name, photo },   // Passando 'name' e 'photo' pela query
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a1a1a' }}>
          Adicione uma foto de perfil
        </Text>

        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{ width: 160, height: 160, borderRadius: 80, marginBottom: 16 }}
          />
        ) : (
          <View
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: '#e0e0e0',
              marginBottom: 16,
            }}
          />
        )}

        <TouchableOpacity
          style={{
            backgroundColor: '#3b82f6',
            padding: 16,
            borderRadius: 8,
            width: '100%',
            marginBottom: 8,
          }}
          onPress={pickImage}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            Escolher foto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 8,
            width: '100%',
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
