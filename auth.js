import { createClient } from "@propelauth/javascript";
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const authClient = createClient({
    // The base URL where your authentication pages are hosted.
    // You can find this under the Frontend Integration section for your project.
    authUrl: "https://28441449250.propelauthtest.com",
  
    // If true, periodically refresh the access token in the background.
    // This helps ensure you always have a valid token ready to go. Default true.
    enableBackgroundTokenRefresh: true,
  });
  
  useEffect(() => {
    const fetchAuthInfo = async () => {
      const authInfo = await authClient.getAuthenticationInfoOrNull(true);
      if (authInfo) {
          console.log("User is logged in as", authInfo.user.email)
          console.log("User's access token is", authInfo.accessToken)
          console.log("User's refresh token is", authInfo.refreshToken)
          console.log("USERID " + authInfo.user.userId)
      } else {
          console.log("User is not logged in")
      }
    };
});




export default function Authentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const observer = (loggedIn) => {
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        authClient.getAuthenticationInfoOrNull().then(authInfo => {
          setEmail(authInfo?.user?.email);
        });
      }
    };
    authClient.addLoggedInChangeObserver(observer);

    // Cleanup on unmount
    return () => {
      authClient.removeLoggedInChangeObserver(observer);
    };
  }, []);

  if (isLoggedIn) {
    return (
      <View>
        <Text>You are logged in {email}</Text>
        <Button title="Account" onPress={authClient.redirectToAccountPage} />
        <Button title="Logout" onPress={authClient.logout} />
      </View>
    );
  } else {
    return (
      <View>
        <Text>You are not logged in</Text>
        <Button title="Sign Up" onPress={authClient.redirectToSignupPage} />
        <Button title="Login" onPress={authClient.redirectToLoginPage} />
      </View>
    );
  }
}