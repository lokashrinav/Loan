import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ViewProfileScreen = ({ route }) => {
  const { profile } = route.params;

  const loansData = require('./tempData.json');

  let count = 0

  for (let i in loansData.users) {
    if (profile.id == loansData.recepientid) {
      count += 1
    }


  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          <Image source={{ uri: profile.profileImage }} style={styles.image} />
          <Text style={styles.info}>Name: {profile.name}</Text>
          <Text style={styles.info}>Email: {profile.email}</Text>
          <Text style={styles.info}>Credit Score: {profile.credit}</Text>
          <Text style={styles.info}>Current Requests: {count}</Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  info: {
    marginBottom: 5,
  },
  speech: {
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  amountInputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  amountInputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  amountInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 300,
    marginTop: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ViewProfileScreen;