import { getDiscoveryDocument } from './DiscoveryDocument';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'

/* const discoveryDocument = getDiscoveryDocument();
const [request, response, promptAsync] = useAuthRequest(
    {
        clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
        redirectUri: AuthSession.makeRedirectUri(),
        usePKCE: true,
    },
    discoveryDocument,
);
 */

//go to IntroScreen.js

export default function LoginScreen() {
  const discoveryDocument = getDiscoveryDocument();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'YOUR_CLIENT_ID',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({
        native: 'YOUR_APP_SCHEME://redirect',
      }),
      extraParams: {
        nonce: 'nonce', // ideally, this will be a random value
      },
    },
    discoveryDocument
  );
    const [click,setClick] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      if (response?.type === 'success' && response.params.code && request?.codeVerifier) {
          const getToken = async () => {
              const exchangeTokenResponse = await AuthSession.exchangeCodeAsync(
                  {
                      clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
                      code: response.params.code,
                      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
                      extraParams: {
                          code_verifier: request.codeVerifier ?? '',
                      },
                  },
                  discoveryDocument,
              );
              saveValueToSecureStore('access_token', exchangeTokenResponse.accessToken);
              saveValueToSecureStore('refresh_token', exchangeTokenResponse.refreshToken);
          };
          getToken();
      }
  }, [response]);
  return (
    <SafeAreaView style={styles.container}>
        
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
        </View>
        <View style={styles.rememberView}>
            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <View>
                <Pressable onPress={() => Alert.alert("Forget Password!")}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.buttonView}>
            <Button disabled={!request} title="Login" onPress={() => promptAsync()} />
            <Text style={styles.optionsText}>OR LOGIN WITH</Text>
        </View>

        <Text style={styles.footerText}>Don't Have Account?<Text style={styles.signup}>  Sign Up</Text></Text>

        
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 160,
    width : 170
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "red"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "red"
  },
  button : {
    backgroundColor : "red",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  signup : {
    color : "red",
    fontSize : 13
  }
})

