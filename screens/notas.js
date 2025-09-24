import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function NotasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* fundo verde */}
      <View style={styles.fundoVerde}> 
        <View style={styles.boxLogo}>
            <Text style={styles.logo}>Sara</Text>
        </View>
      </View>

      {/* fundo azul */}
      <View style={styles.fundoAzul}>
        <View style={styles.row}>
          <Ionicons name="bookmark" size={20} color="#fff" />
          <Text style={styles.textoTitulo}>Notas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // base de fundo do app
  },

  fundoVerde: {
    width: '100%',
    height: 120,                 
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxLogo:{
    backgroundColor: '#1E3A5F',   // cor do retângulo
    paddingHorizontal: 20,          // largura do retângulo
    paddingVertical: 8,             // altura do retângulo
    borderRadius: 10,               // cantos arredondados
    elevation: 4,                   // sombra (Android)
    shadowColor: '#000',          // sombra (IOS)
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  fundoAzul: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E3A5F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',          
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                      
  },

  textoTitulo: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  logo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    
  },
});

export default NotasScreen;
