import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Footer from './Footer.js'
import Header from './Header.js'

const loansData = require('./tempData.json');


// Main File - Home Page - Change anything as you see fit
export default function HomePage({navigation}) {
  const loans = loansData.loans
  
  return (
    // View.container is whole page
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}   
      showsVerticalScrollIndicator={false}>
      {/*This is Empty space at the top above header. Temporarily change backgroundColor to identify in CSS below*/}
      <View style={styles.empty} />
      {/* Header of file. Contains search bar and chat icon*/}
      <Header />
      <View style={styles.extraPadding}></View>
      <View style={styles.smallSpacing} />


      
      <View style={styles.cardContainer}>
              <View style={styles.innerContainer}>
                <View>
                {loans.map((loan, index) => (
                  <TouchableOpacity key={index} style={styles.Card} onPress={() => navigation.navigate(`LoanDetails${index}`)}>
                    <View style={styles.Top}>
                      <Text style={styles.Title}>{loan.purpose}</Text>
                    </View>
                      <Text style={styles.Text}>Recipient: {loan.recipient}</Text> 
                      <Text style={styles.Text}>Loan ID: {loan.LoanID}</Text>
                      <Text style={styles.Text}>Amount: {loan.amount}</Text>
                      <Text style={styles.Text}>Interest Rate: {loan.interestRate}</Text>
                      <Text style={styles.Text}>Term: {loan.termMonths}</Text>
                      <Text style={styles.Text}>Number of Loaners: {loan.groupMembers.length}</Text>
                      <Text style={styles.Text1}>Click Card for More Information</Text>
                
                </TouchableOpacity>
                ))}
                </View>
              </View>
        
      </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );  
}

const styles = StyleSheet.create({
  extraPadding: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(57,62,66,255)',
    borderBottomWidth: 3
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  cardContainer: {
    marginBottom: 100,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: {
    height: 50,
    backgroundColor: 'rgba(57,62,66,255)',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  spacing: {
    marginVertical: 300, // Adjust the value as needed
  },
  Card: {
    marginBottom: 10,
    height: 220,
    backgroundColor: 'white',
    width: 300,
    borderRadius: 15,
    borderWidth: 2,
    padding: 10
  },
  smallSpacing: {
    marginVertical: 10, // Adjust the value as needed
  },
  Text: {
    color: 'black',
    marginBottom: 5
  },
  Text1: {
    marginBottom: 5,
    fontWeight: 'bold'
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 30
  },
  image: { 
    width: 60,
    height: 60,
    borderRadius: 30
  },
  Top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  firstRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  secondRow: {
    flexDirection: 'row',
    marginBottom: 10
  }
});