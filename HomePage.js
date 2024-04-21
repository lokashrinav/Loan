import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Footer from './Footer.js'
import Header from './Header.js'
import ProgressBar from 'react-native-progress/Bar'
import { Chip, Divider } from 'react-native-elements';

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
      {/* Header of file. Contains search bar and chat icon*/}
      <Header />
      <View style={styles.extraPadding}></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Chip title="Location" containerStyle={{ marginVertical: 15, marginHorizontal: 5 }} />
          <Chip title="Interest Rate" containerStyle={{ marginVertical: 15, marginHorizontal: 5 }} />
          <Chip title="Amount" containerStyle={{ marginVertical: 15, marginHorizontal: 5 }} />
          <Chip title="Term" containerStyle={{ marginVertical: 15, marginHorizontal: 5 }} />
          <Chip title="Additional Filters" containerStyle={{ marginVertical: 15, marginHorizontal: 5 }} />
        </View>
      </ScrollView>
      <Divider
          style={{ width: "100%" }}
          color="black"
          width={1}
          marginBottom = {15}
          orientation="horizontal"
      />
      
      <View style={styles.cardContainer}>
              <View style={styles.innerContainer}>
                <View>
                {loans.map((loan, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate(`LoanDetails${index}`)} style={styles.Card}>
                    <View style={styles.Top}>
                      <Text style={styles.Title}>{loan.purpose}</Text>
                    </View>
                      <ProgressBar progress={loan.fundedAmount/loan.amount} width={0.9 * styles.Card.width} height={10} color="green"/>
                      <Text></Text>
                      <Text style={styles.Text}>Recipient: {loan.recipient}</Text> 
                      <Text style={styles.Text}>Amount: {loan.amount}</Text>
                      <Text style={styles.Text}>Interest Rate: {loan.interestRate}</Text>
                      <Text style={styles.Text}>Term: {loan.termMonths}</Text>
                      <Text style={styles.Text1}>Click Card for More Information</Text>
                      <Divider
                        style={{ width: "100%", margin: 5 }}
                        color="black"
                        width={1}
                        marginBottom = {10}
                        orientation="horizontal"
                      />
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
    width: '100%'
  },
  spacing: {
    marginVertical: 300, // Adjust the value as needed
  },
  changeCard: {
    width: '100%'
  },
  scrollView: {
    width: '100%'
  },  
  Card: {
    marginBottom: 15,
    height: 220,
    backgroundColor: 'white',
    width: 360,
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
    fontWeight: 'bold',
    textAlign:'center'
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