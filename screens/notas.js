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

        {/* cabeçalho do período (ano + período) com ícone de calendário */}
        <View style={styles.periodoBox}>
          <Ionicons name="calendar" size={22} color="#fff" />
          <View>
            <Text style={styles.periodoAno}>2025</Text>
            <Text style={styles.periodoTexto}>1º Período</Text>
          </View>
        </View>

        {/* blocos de médias (período e geral) alinhados lado a lado */}
        <View style={styles.mediaContainer}>
          {/* média do período */}
          <View style={styles.mediaBox}>
            <Text style={styles.mediaTitulo}>Média do período</Text>
            <Text style={styles.mediaValor}>
              7,6
              <Text style={styles.mediaTotal}> /10</Text>
            </Text>
          </View>

          {/* média geral */}
          <View style={styles.mediaBox}>
            <Text style={styles.mediaTitulo}>Média geral</Text>
            <Text style={styles.mediaValor}>
              8,5
              <Text style={styles.mediaTotal}> /10</Text>
            </Text>
          </View>
        </View>

        {/* lista de disciplinas com card e barra lateral de status */}
        {/* cada card possui: barra de status (aprovado/reprovado), título, nota e status */}
        <View style={styles.card}>
          <View style={[styles.statusBar, { backgroundColor: '#4CAF50' }]} /> 
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Inglês básico</Text>
            <Text style={styles.cardNota}>9,6</Text>
            <Text style={styles.cardStatus}>Aprovado</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.statusBar, { backgroundColor: '#4CAF50' }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Arquitetura de Computadores</Text>
            <Text style={styles.cardNota}>8,7</Text>
            <Text style={styles.cardStatus}>Aprovado</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.statusBar, { backgroundColor: '#F44336' }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Música</Text>
            <Text style={styles.cardNota}>4,5</Text>
            <Text style={styles.cardStatusReprovado}>Reprovado</Text>
          </View>
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
    shadowColor: '#000',            // sombra (IOS)
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
    gap: 8,                       // espaço entre ícone e título
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

  /* === novas seções === */

  periodoBox: {
    // bloco com o ícone e as infos do período (topo do painel azul)
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 20,
    justifyContent: 'center'
  },

  periodoAno: {
    // ano destacado
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },

  periodoTexto: {
    // texto secundário (ex.: 1º Período)
    color: '#ddd',
    fontSize: 14,
  },

  mediaContainer: {
    // container horizontal das duas médias
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  mediaBox: {
    // cada coluna de média
    alignItems: 'center',
    flex: 1,
  },

  mediaTitulo: {
    // rótulo de cada média
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },

  mediaValor: {
    // valor principal da média
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  mediaTotal: {
    // sufixo "/10" com menor destaque
    fontSize: 14,
    color: '#ccc',
  },

  card: {
    // card de disciplina (fundo levemente mais claro que o painel)
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17243fff',
    borderRadius: 12,
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
  },

  statusBar: {
    // barra vertical de status (verde = aprovado / vermelho = reprovado)
    width: 4,
    height: '100%',
    borderRadius: 4,
    marginRight: 12,
  },

  cardContent: {
    // área de textos do card
    flex: 1,
  },

  cardTitulo: {
    // nome da disciplina
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },

  cardNota: {
    // nota em destaque
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  cardStatus: {
    // status aprovado (verde da identidade)
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  cardStatusReprovado: {
    // status reprovado (vermelho de alerta)
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default NotasScreen;
