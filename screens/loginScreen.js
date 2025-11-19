// screens/LoginScreen.js
import React from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import { styles } from '../stylesLogin';

export default function LoginScreen({ navigation }) {
  function handleLogin() {
    navigation.replace('MainTabs'); // vai para as Tabs e remove o login da pilha
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Sara</Text>

      <TextInput
        style={styles.formInput}
        placeholder=" Email"
        placeholderTextColor="#FFFFFF"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TextInput
        style={styles.formInput}
        placeholder=" Senha"
        placeholderTextColor="#FFFFFF"
        autoCapitalize="none"
        secureTextEntry
      />

      <Pressable style={styles.formButton} onPress={handleLogin}>
        <Text style={styles.TextButton}>Logar</Text>
      </Pressable>
    </View>
  );
}
