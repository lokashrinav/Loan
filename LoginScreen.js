import { getDiscoveryDocument } from './DiscoveryDocument';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { Dimensions } from 'react-native';
import * as React from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

import axios from 'axios';



//Client secret: 33c6f6835b01d22ea282196be8585c741cb3a17c5d28ffaefdbc3986ed55ec93489895d5840a92c20e5285f62449b7c0

export default function LoginScreen({ navigation }) {
  // Discovery document for OAuth endpoints
  const discoveryDocument = getDiscoveryDocument();

  // Auth request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '33c6f6835b01d22ea282196be8585c74' ?? '',
      redirectUri: AuthSession.makeRedirectUri() ?? '',
      usePKCE: true,
    },
    discoveryDocument,
  );


  // Exchange code for tokens and store securely
  React.useEffect(() => {
    if (response?.type === 'success' && response.params.code && request?.codeVerifier) {
      const getToken = async () => {
        const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: '33c6f6835b01d22ea282196be8585c74' ?? '',
            code: response.params.code,
            redirectUri: 'exp://172.23.16.141:8081' ?? '',
            extraParams: {
              code_verifier: request.codeVerifier ?? '',
            },
          },
          discoveryDocument,
        );
        if (exchangeTokenResponse.error) {
          console.log('Error:', exchangeTokenResponse.error);
          return;
        }
        console.log('Exchange token response:', exchangeTokenResponse);

        // Store tokens securely
        await AsyncStorage.setItem('accessToken', exchangeTokenResponse.accessToken);
        await AsyncStorage.setItem('refreshToken', exchangeTokenResponse.refreshToken);

        console.log('Tokens stored successfully');

        // Fetch user data
        const userData = await fetchUserData();
        console.log('User data:', userData);
      };
      getToken();
    };
    async function getInitialURL() {
      const url = await Linking.getInitialURL();
      console.log('url', url);
      if (url) {
        handleOpenURL({ url });
      }

      Linking.addEventListener('url', handleOpenURL);
      return () => {
        Linking.removeEventListener('url', handleOpenURL);
      };
    }

    getInitialURL();
  });
  function handleOpenURL(event) {
    let { url } = event;
    // Parse the URL and handle the deep link
  }
  console.log('response', response);
  console.log('request', request);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Welcome To PerLoan</Text>

      <View style={styles.buttonView}>
        <Button
          disabled={!request}
          title="Login"
          onPress={async function () {
            const result = await promptAsync();
            console.log('result', result);
            if (result.type === 'success') {
              console.log('Login successful');
              // run api call to post data
              const myHeaders = new Headers();
              // myHeaders.append("Content-Type", "application/json");
              // // go through exchangeTopicResponse and get the email
              // const exchangeTokenResponseString = JSON.stringify(exchangeTokenResponse);
              // const rawObject = JSON.parse(raw);
              // const email = rawObject.email;
              // const first_name = rawObject.first_name;
              // const last_name = rawObject.last_name;
              // const raw = JSON.stringify({
              //   "access_token": await AsyncStorage.getItem('accessToken'),
              //   "refresh_token": await AsyncStorage.getItem('refreshToken'),
              //   "email": email,
              //   "address": "123 Main St, Anytown, USA",
              //   "password": "password123",
              //   "profileImgLink": "https://example.com/profile.jpg",
              //   "creditScore": 750,
              //   "first_name": first_name,
              //   "last_name": last_name
              // });

              // const requestOptions = {
              //   method: "POST",
              //   headers: myHeaders,
              //   body: raw,
              //   redirect: "follow"
              // };

              // fetch("https://backend_bit_camp2024.duckman848.workers.dev/auth/initUser", requestOptions)
              //   .then((response) => response.text())
              //   .then((result) => console.log(result))
              //   .catch((error) => console.error(error));
              // Navigate to HomePage after a successful login
              navigation.navigate('Home');
            }
            else {
              Alert.alert('Error', 'Login failed');
              console.log('Login failed');
            }
          }}
        />
      </View>
      <View style={styles.buttonView}>
        <Button disabled={!request} title="Sign Up" onPress={() => promptAsync()} />
      </View>
      <View style={styles.buttonView}>
        <Button disabled={!request} title="Logout" onPress={() => logoutUser()} />
      </View>
    </SafeAreaView>
  )
}


// Function to fetch user data
const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const response = await axios.get(`https://28441449250.propelauthtest.com/propelauth/oauth/userinfo`, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Function to refresh tokens
async function getNewAccessAndRefreshTokens(refresh_token) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      "refresh_token": refresh_token
    };
    const response = await axios.post(`https://28441449250.propelauthtest.com/api/backend/v1/refresh_token`,
      data,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};


// Function to log out user
async function logoutUser(refresh_token) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      "refresh_token": refresh_token
    };
    const response = await axios.post(`https://28441449250.propelauthtest.com/api/backend/v1/logout`,
      data,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  image: {
    height: 160,
    width: 170
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "red"
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  rememberText: {
    fontSize: 13
  },
  forgetText: {
    fontSize: 11,
    color: "red"
  },
  bbutton: {
    backgroundColor: "red",
    height: height * 0.07, // 7% of screen height
    borderColor: "gray",
    borderWidth: width * 0.005, // 0.5% of screen width
    borderRadius: height * 0.035, // 3.5% of screen height
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: width * 0.07,
    marginTop: height * 0.02, // 2% of screen height
    marginBottom: height * 0.02, // 2% of screen height
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: height * 0.01,
    color: "gray",
    fontSize: 13,
    marginBottom: height * 0.01
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "red",
    fontSize: 13
  }
})
