import React, { useState } from 'react';
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
        <Text style={styles.title}>Loan Details</Text>
        <View style={styles.card}>
          <Image source={{ uri: loan.Link }} style={styles.image} />
          <Text style={styles.info}>Loan ID: {loan.LoanID}</Text>
          <Text style={styles.info}>Recipient: {loan.recipient}</Text>
          <Text style={styles.info}>Amount: {loan.amount}</Text>
          <Text style={styles.info}>Funded Amount: {loan.fundedAmount}</Text>
          <Text style={styles.info}>Interest Rate: {loan.interestRate}</Text>
          <Text style={styles.info}>Term Months: {loan.termMonths}</Text>
          <Text style={styles.info}>Purpose: {loan.purpose}</Text>
          <Text style={styles.info}>Status: {loan.status}</Text>
          <Text style={styles.speech}>{loan.speech}</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.amountInputLabel}>Enter amount to join:</Text>
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

export default LoanDetailsScreen;