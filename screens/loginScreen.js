import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import { styles } from '../stylesLogin';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleLogin() {
    console.log('CLICOU NO BOTÃO');
    console.log('Email:', email);
    console.log('Senha:', senha);

    if (!validarEmail(email)) {
      console.log('EMAIL INVÁLIDO');
      Alert.alert('Erro', 'Digite um email válido!');
      return;
    }

    if (senha.length < 6) {
      console.log('SENHA CURTA');
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    console.log('TUDO CERTO, MOSTRANDO SUCESSO');

    Alert.alert(
      'Sucesso',
      'Login realizado!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('INDO PARA MainTabs');
            navigation.replace('MainTabs');
          },
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      {console.log('RENDER LOGIN SCREEN')}
      <Text style={styles.formTitle}>Sara</Text>

      <TextInput
        style={[styles.formInput, { color: '#FFFFFF' }]}
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.formInput, { color: '#FFFFFF' }]}
        placeholder="Senha"
        placeholderTextColor="#FFFFFF"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable
        style={styles.formButton}
        onPress={() => handleLogin()} // força a chamada da função
      >
        <Text style={styles.TextButton}>Logar</Text>
      </Pressable>
    </View>
  );
}
