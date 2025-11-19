// screens/chat.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const tabBarHeight = useBottomTabBarHeight(); // altura real da tab bar

  function send() {
    if (!text.trim()) return;
    setMessages((prev) => [
      { id: String(Date.now()), text: text.trim() },
      ...prev,
    ]);
    setText("");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* faixa verde superior */}
      <View style={styles.fundoVerde}>
        <View style={styles.boxLogo}>
          <Text style={styles.logo}>Sara</Text>
        </View>
      </View>

      {/* corpo azul com título + mensagens + input */}
      <KeyboardAvoidingView
        style={[
          styles.fundoAzul,
          { paddingBottom: tabBarHeight + 8 }, // espaço p/ não ficar atrás da tab bar
        ]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* título do chat */}
        <View style={styles.headerRow}>
          <Ionicons name="chatbubble" size={20} color="#fff" />
          <Text style={styles.textoTitulo}>Chat</Text>
        </View>

        {/* lista de mensagens */}
        <View style={styles.messagesContainer}>
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.msgBubble}>
                <Text style={styles.msgText}>{item.text}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>Nenhuma mensagem ainda</Text>
            }
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              flexGrow: 1,
              justifyContent: messages.length === 0 ? "center" : "flex-start",
            }}
          />
        </View>

        {/* área de digitação */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Escreva sua mensagem..."
            placeholderTextColor="#2f2222ff"
          />
          <TouchableOpacity style={styles.sendButton} onPress={send}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50", // mesmo verde do projeto
  },

  // topo verde
  fundoVerde: {
    width: "100%",
    height: 120,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  boxLogo: {
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  logo: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  // área azul arredondada
  fundoAzul: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1E3A5F",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  textoTitulo: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  messagesContainer: {
    flex: 1,
  },

  empty: {
    textAlign: "center",
    color: "#f1ebebff",
  },

  msgBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#efefef",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: "80%",
  },

  msgText: {
    color: "#111",
  },

  inputRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#eaeffbff",
    backgroundColor: "#1E3A5F",
    marginTop: 8,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f0f0ff",
    height: 48,
    marginRight: 8,
  },

  sendButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
