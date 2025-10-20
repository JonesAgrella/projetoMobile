import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Dados mockados (simulando um pequeno "banco" local)
const RECADOS = [
  { id: '1', texto: 'Prof. Enolia: prova de inglês primeira aula', data: '30/06/25' },
  { id: '2', texto: 'Dia 25/09 viagem evento cultural Ribeirão Preto', data: '30/06/25' },
  { id: '3', texto: 'Aula cancelada hoje!', data: '30/06/25' },
];

// Componente para exibir cada recado individual (ícone + texto + data)
// Agora com toque para abrir detalhes (Modal)
function RecadoCard({ texto, data, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name="notifications-outline" size={20} color="#fff" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{texto}</Text>
        <Text style={styles.cardDate}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
}

function RecadoScreen() {
  // Estado para controlar o Modal e o recado selecionado
  const [modalVisivel, setModalVisivel] = React.useState(false);
  const [recadoSelecionado, setRecadoSelecionado] = React.useState(null);

  // Abrir modal com dados do recado
  const abrirDetalhes = (item) => {
    setRecadoSelecionado(item);
    setModalVisivel(true);
  };

  // Fechar modal
  const fecharDetalhes = () => {
    setModalVisivel(false);
    setRecadoSelecionado(null);
  };

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
          <Text style={styles.textoTitulo}>Recados</Text>
        </View>

        {/* Lista de recados mockada */}
        <FlatList
          data={RECADOS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecadoCard
              texto={item.texto}
              data={item.data}
              onPress={() => abrirDetalhes(item)}
            />
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
        />
      </View>

      {/* Modal de detalhes do recado */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={fecharDetalhes}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
              <Text style={styles.modalTitulo}>Detalhes do recado</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.modalLabel}>Mensagem</Text>
              <Text style={styles.modalTexto}>
                {recadoSelecionado?.texto}
              </Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.modalLabel}>Data</Text>
              <Text style={styles.modalData}>{recadoSelecionado?.data}</Text>
            </View>

            <TouchableOpacity style={styles.modalBotao} onPress={fecharDetalhes} activeOpacity={0.9}>
              <Text style={styles.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  logo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
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

  // === Estilos dos cards de recados ===
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F243D',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  cardIcon: {
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },

  cardDate: {
    color: '#B0C4DE',
    fontSize: 12,
    textAlign: 'right',
  },

  // === Estilos do Modal ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#0F243D',
    borderRadius: 14,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalLabel: {
    color: '#B0C4DE',
    fontSize: 12,
    marginBottom: 4,
  },
  modalTexto: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  modalData: {
    color: '#fff',
    fontSize: 14,
  },
  modalBotao: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#0F243D',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RecadoScreen;
