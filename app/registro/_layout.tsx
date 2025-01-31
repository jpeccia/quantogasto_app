import { Stack } from 'expo-router';

export default function RegistroLayout() {
  return (
    <Stack>
      <Stack.Screen name="nome" options={{ headerShown: false }} />
      <Stack.Screen name="perfil" options={{ headerShown: false }} />
      <Stack.Screen name="cargo" options={{ headerShown: false }} />
      <Stack.Screen name="renda" options={{ headerShown: false }} />
    </Stack>
  );
}