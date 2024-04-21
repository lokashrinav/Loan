import React, { useState } from 'react';
import { Divider } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Footer from './Footer.js'

const ChatScreen = ({ route, navigation }) => {
    const { conversationId, conversationName, lastMessage } = route.params;

  const [messages, setMessages] = useState([
    { id: 1, sender: conversationName, content: 'Hey there!' },
    { id: 2, sender: 'You', content: `Hi ${conversationName}, how are you?` },
    { id: 2, sender: conversationName, content: lastMessage },
    // Add more messages as needed
  ]);
  const [inputText, setInputText] = useState('');

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'You' && styles.sentMessage]}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.messageContent}>{item.content}</Text>
    </View>
  );

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: inputText,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        inverted={false} // Start displaying messages from the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;