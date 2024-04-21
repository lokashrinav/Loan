import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage'; // Import your home page component
import LoanDetailsScreen from './LoanDetailsScreen'; // Import your loan details screen component
import ViewProfileScreen from './viewProfile';
import ViewAddScreen from './viewAdd';
import ViewChatScreen from './viewChat';
import ChatScreen from './Chat';
import LoginScreen from './LoginScreen';

const loansData = require('./tempData.json');

const userData = require('./userData.json');

const Stack = createNativeStackNavigator();

currentUser = 0

export default function App() {


  const current = {
    "credit": "C+",
    "id": "4",
    "name": "Michael Brown",
    "email": "michael.brown@example.com",
    "password": "hashed_password",
    "creditCard": {
      "cardNumber": "3698 7412 5841 2369",
      "expiryDate": "05/22",
      "cvv": "321"
    },
    "address": {
      "street": "321 Pine St",
      "city": "Villagetown",
      "state": "FL",
      "zipCode": "45678",
      "country": "USA"
    },
    "ssn": "789-12-3456",
    "profileImage": "http://images.dinosaurpictures.org/dinosaurs-tyrannosaurus_00336745_13a8.jpg"
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomePage} />
        {loansData.loans.map((loan, index) => (
          <Stack.Screen
            key={index}
            name={`LoanDetails${index}`} // Use a unique name for each screen
            component={LoanDetailsScreen}
            initialParams={{ loan }} // Pass the loan object as params
          />
        ))}
        <Stack.Screen name="viewProfile" component={ViewProfileScreen} initialParams={{ profile: current }} />
        <Stack.Screen name="viewAdd" component={ViewAddScreen} initialParams={{ profile: current }} />
        <Stack.Screen name="viewChat" component={ViewChatScreen} initialParams={{ profile: current }} />
        <Stack.Screen name="Chat" component={ChatScreen} initialParams={{ profile: current }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}