import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Alert } from 'react-native';

const LoanDetailsScreen = ({ route }) => {
  const { loan } = route.params;
  const jsonData = require('./tempData.json');
  const [joinAmount, setJoinAmount] = useState('');

  const join = () => {
    if (joinAmount !== '') {
      const amount = parseFloat(joinAmount);
      if (amount > 0 && amount <= (loan.amount - loan.fundedAmount)) {
        Alert.alert('Success', `Joining $${amount}`);
        loan.fundedAmount = newFundedAmount;
      
        fs.writeFileSync('./tempData.json', JSON.stringify(jsonData, null, 2));
        
      } else {
        Alert.alert('Error', 'Please enter a valid amount');
      }
    } else {
      Alert.alert('Error', 'Please enter an amount to join.');
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title} marginTop={20}>Loan Details</Text>
        <Image source={{ uri: loan.Link }} style={styles.image} marginBottom={20}/>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Loan ID: {loan.LoanID}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Recipient: {loan.recipient}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Amount: {loan.amount}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Funded Amount: {loan.fundedAmount}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Interest Rate: {loan.interestRate}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Term Months: {loan.termMonths}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
            <Text style={styles.info}>Purpose: {loan.purpose}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View alignItems='center'>
          <Text style={styles.info}>Status: {loan.status}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <View alignItems='center'>
            <Text style={styles.speech}>{loan.speech}</Text>
          </View>
        </View>
          
        <View style={styles.amountInputContainer}>
          <Text style={styles.amountInputLabel}>Enter amount to contribute:</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            value={joinAmount}
            onChangeText={text => setJoinAmount(text)}
            placeholder="0"
            placeholderTextColor="#999"
            maxLength={5} // Limiting to 5 digits
          />
        </View>
        <TouchableOpacity style={styles.joinButton} onPress={join}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
        <Text marginBottom={-270}></Text>
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
    backgroundColor: 'white'
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
    width: 370,
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
  details: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    width: '60%',
    height: '3.9%',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    alignSelf: 'center',

  },
  description: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    width: '95%',
    height: '10%',
    alignItems: 'center',
    marginBottom: 0,
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default LoanDetailsScreen;