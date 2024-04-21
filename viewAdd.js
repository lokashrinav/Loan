import * as React from 'react';
import { Divider, Input, Button } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Alert } from 'react-native';

const ViewAddScreen = ({ route }) => {
  const { profile } = route.params;
  const [interestRate, setInterestRate] = React.useState('');
  const [loanAmount, setLoanAmount] = React.useState('');
  const [termMonths, setTermMonths] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handlePostButtonPress = () => {
    // Your logic for posting the loan data
    // Alert when the loan is posted successfully
    Alert.alert('Loan is currently in review. We will post it for you shortly!');

    // Clear input fields after posting
    setInterestRate('');
    setLoanAmount('');
    setTermMonths('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} marginBottom={25}> Post New Request</Text>
      <Input
        placeholder='Please Enter Your Desired Interest Rate'
        style={styles.input}
        onChangeText={setInterestRate}
        value={interestRate}
      />
      <Input
        placeholder='Please Enter Your Desired Loan Amount'
        style={styles.input}
        onChangeText={setLoanAmount}
        value={loanAmount}
      />
      <Input
        placeholder='Please Enter Your Desired Months Term'
        style={styles.input}
        onChangeText={setTermMonths}
        value={termMonths}
      />
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40000000000}
        onChangeText={setDescription}
        value={description}
        style={styles.textArea}
        marginTop={7}
        placeholder="Please Enter Description..."
      />
      <Button
        title="Post"
        buttonStyle={styles.postButton}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        onPress={handlePostButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 15,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Georgia'
  },
  input: {
    padding: 10,
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 10,
    width: 370,
  },
  textArea: {
    padding: 10,
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 10,
    height: 100,
    width: 370,
    marginTop: 7,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  postButton: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
  },
  buttonTitle: {
    color: 'white',
    marginHorizontal: 20,
  },
});

export default ViewAddScreen;
