import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import * as Font from 'expo-font';


// This is an async function that loads your font.
const loadFonts = async () => {
  await Font.loadAsync({
    // The key is the name you'll use to refer to this font in your styles.
    // The value is the location of your font file relative to your project root.
    Arial: require('./assets/arial.ttf'),
  });
};

// Call this function in your App component.
loadFonts();

const LoanDetailsScreen = ({ route }) => {
  const { loan } = route.params;
  const [joinAmount, setJoinAmount] = useState('');

  const join = () => {
    if (joinAmount.trim() !== '') {
      const amount = parseFloat(joinAmount);
      if (amount > 0 && amount <= (loan.amount - loan.fundedAmount)) {
        Alert.alert('Success', `Joining $${amount}`);
        // Update funded amount (assuming loan object is mutable)
        loan.fundedAmount += amount;
        // You might need to update your data store here
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
        <Image source={{ uri: loan.Link }} style={styles.image} />
        <DetailView label="Recipient" value={loan.recipient} />
        <DetailView label="Seeking" value={`$${loan.amount}`} />
        <DetailView label="Funded Amount" value={loan.fundedAmount.toString()} />
        <DetailView label="Interest Rate" value={loan.interestRate} />
        <DetailView label="Term (Months)" value={loan.termMonths} />
        <DetailView label="Purpose" value={loan.purpose} />
        <DetailView label="Status" value={loan.status} />
        <View style={styles.description}>
          <Text style={styles.speech}>{loan.speech}</Text>
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
      </View>
    </ScrollView>
  );
};

const DetailView = ({ label, value }) => (
  <View style={styles.details}>
    <Text style={styles.info}>
      {label}: {value}
    </Text>
  </View>
);

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Arial', // Change to your preferred font
  },
  image: {
    width: 370,
    height: 200,
    marginBottom: 20,
  },
  details: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
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
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Arial', // Change to your preferred font
  },
  amountInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Arial', // Change to your preferred font
  },
  joinButton: {
    backgroundColor: 'blue',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Arial', // Change to your preferred font
  },
});

export default LoanDetailsScreen;
