import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

export default function NameScreen() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleNext() {
    if (name.trim().length < 3) {
      setError("Nome deve ter pelo menos 3 caracteres");
      return;
    }
    // Navegar para a próxima tela após a validação do nome
    router.push("/profile-pic");
  }

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 500 }}
        style={styles.motiView}
      >
        <Text style={styles.title}>Qual é o seu nome?</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError(""); // Limpar erro se o texto mudar
          }}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { opacity: name.trim() ? 1 : 0.5 }]}
          onPress={handleNext}
          disabled={!name.trim()}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a", // Fundo escuro para a tela
    padding: 24,
  },
  motiView: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
