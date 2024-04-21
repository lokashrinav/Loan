import React, { useState } from 'react';
import { Divider } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Footer from './Footer.js'

const ViewChatScreen = ({ route, navigation }) => {
    const [conversations, setConversations] = useState([
        { id: 1, name: 'John Doe', lastMessage: 'That interest rate is a little too low, would you consider increasing it by 5%?', unreadCount: 2 },
        { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', unreadCount: 0 },
        { id: 3, name: 'Alice Johnson', lastMessage: 'Don\'t forget our meeting at 3 PM!!!', unreadCount: 1 },
        // Add more conversations as needed
      ]);

      

      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={styles.conversationItem}
          onPress={() => navigation.navigate('Chat', { conversationId: item.id, conversationName: item.name, lastMessage: item.lastMessage })}
        >
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    
      return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.title}> Chats</Text>
                <FlatList
                    data={conversations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
            <Footer navigation={navigation} />
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      conversationItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      conversationName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      lastMessage: {
        fontSize: 16,
        color: '#666',
      },
      unreadBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'blue',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      unreadCount: {
        color: '#fff',
        fontWeight: 'bold',
      },
      title: {
        marginTop: 15,
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: -15,
        marginBottom: 3,
        fontFamily: 'Georgia'
      },
    });
    

export default ViewChatScreen;