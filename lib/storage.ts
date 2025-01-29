import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  AUTH_TOKEN: '@finance_app_token',
  USER_DATA: '@finance_app_user',
  EXPENSES: '@finance_app_expenses',
  INCOMES: '@finance_app_incomes',
};

export async function storeAuthToken(token: string) {
  await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
}

export async function getAuthToken() {
  return AsyncStorage.getItem(KEYS.AUTH_TOKEN);
}

export async function removeAuthToken() {
  await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
}

export async function storeUserData(userData: any) {
  await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
}

export async function getUserData() {
  const data = await AsyncStorage.getItem(KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
}

export async function storeExpenses(expenses: any[]) {
  await AsyncStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
}

export async function getExpenses() {
  const data = await AsyncStorage.getItem(KEYS.EXPENSES);
  return data ? JSON.parse(data) : [];
}

export async function storeIncomes(incomes: any[]) {
  await AsyncStorage.setItem(KEYS.INCOMES, JSON.stringify(incomes));
}

export async function getIncomes() {
  const data = await AsyncStorage.getItem(KEYS.INCOMES);
  return data ? JSON.parse(data) : [];
}