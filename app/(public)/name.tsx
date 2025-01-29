import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

export default function NameScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-6">
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 500 }}
        className="w-full"
      >
        <Text className="text-white text-xl mb-4">Qual é o seu nome?</Text>
        <TextInput
          className="bg-gray-800 text-white p-4 rounded-lg w-full"
          placeholder="Digite seu nome"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          className="mt-4 bg-blue-500 p-4 rounded-lg w-full items-center"
          onPress={() => router.push("/registration/profile-pic")}
          disabled={!name}
        >
          <Text className="text-white text-lg">Próximo</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}
