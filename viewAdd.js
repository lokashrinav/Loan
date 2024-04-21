import * as React from 'react';
import { Divider, Input, Button } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';

const ViewAddScreen = ({ route }) => {
  const { profile } = route.params;
  const [value, onChangeText] = React.useState('');
  const loansData = require('./tempData.json');

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title} marginBottom={25}> Post New Request</Text>
        <Input 
            placeholder='Please Enter Your Desired Interest Rate'
            style={{
                padding: 10,
                borderWidth: 0.7,
                borderColor: 'black',
                borderRadius: 10,
            }}
            />
        <Text style={styles.minilabel}> Desired Interest Rate</Text>
        <Input 
            placeholder='Please Enter Your Desired Loan Amount'
            style={{
                padding: 10,
                borderWidth: 0.7,
                borderColor: 'black',
                borderRadius: 10,
            }}
            />
        <Text style={styles.minilabel}> Desired Loan Amount</Text>
        <Input 
            placeholder='Please Enter Your Desired Months Term' 
            style={{
                padding: 10,
                borderWidth: 0.7,
                borderColor: 'black',
                borderRadius: 10,
            }}
            />
        <Text style={styles.minilabel}> Desired Month Term</Text>
        <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40000000000}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={{
                padding: 10,
                borderWidth: 0.7,
                borderColor: 'black',
                borderRadius: 10,
                height: 100,
                width: 370
            }}
            marginTop={7}        
            placeholder="Please Enter Description..."
        />
        <Text style={styles.minilabel} marginTop={2} marginLeft={8}> Description</Text>
        <Button
              title="Post"
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
            />
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
    justifyContent: 'top',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 15,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Georgia'
  },
  minilabel: {
    marginTop: -20,
    marginBottom: 10,
    marginLeft: 8,
    fontSize: 12,
    alignSelf: "left",
    fontStyle: 'italic'
  }
});

export default ViewAddScreen;