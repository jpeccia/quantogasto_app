import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Aguarda o carregamento dos dados antes de redirecionar

    if (user?.token) {
      router.replace("/home"); // Usa replace para evitar acúmulo no histórico
    } else {
      router.replace("/name");
    }
  }, [user?.token, isLoading, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={40} />
    </View>
  );
}
