import * as React from 'react';
import { Divider } from '@rneui/themed';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button } from 'react-native';
import Footer from './Footer.js';
import * as Font from 'expo-font';
import logoutUser from './LoginScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadFonts = async () => {
  await Font.loadAsync({
    Georgia: require('./assets/Georgia.ttf'),
  });
};
loadFonts();


let refreshToken = null;
const refreshTokens = async () => {
  const token = await AsyncStorage.getItem('refreshToken');
  refreshToken = token;
};
// get refresh token
refreshTokens();


const ViewProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params;

  const loansData = require('./tempData.json');

  const userData = require('./userData.json');


  let postCount = 3;
  let lendCount = 3;

  for (let i in loansData.users) {
    if (profile.id == loansData.recepientid) {
      postCount += 1;
    }
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Expenditure',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Expenditure',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Expenditure',
    },
  ];

  const DATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Request',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Request',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Request',
    },
  ];

  let profile2 = userData["users"][2]
  const Item = ({ title }) => (
    <View style={styles.container}>
      <View style={styles.expenditure}>
        <Image source={{ uri: profile2.profileImage }} style={styles.image} />
        <View alignItems='center'>
          <Text style={styles.info}>Name: {profile2.name}</Text>
          <Text style={styles.email}>Email: {profile2.email}</Text>
          <Text style={styles.info}>Credit Score: {profile2.credit}</Text>
          <Text style={styles.info}>Current Requests: {postCount}</Text>
        </View>
      </View>
    </View>
  );

  let profile1 = userData["users"][1]
  const Item2 = ({ title }) => (
    <View style={styles.container}>
      <View style={styles.request}>
        <Image source={{ uri: profile1.profileImage }} style={styles.image} />
        <View alignItems='center'>
          <Text style={styles.info}>Name: {profile1.name}</Text>
          <Text style={styles.email}>Email: {profile1.email}</Text>
          <Text style={styles.info}>Credit Score: {profile1.credit}</Text>
          <Text style={styles.info}>Current Requests: {postCount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    
    <>
    
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}> My Profile</Text>
          <View style={styles.profile}>
            <Image source={{ uri: profile.profileImage }} style={styles.image} />
            <View alignItems='center'>
              <Text style={styles.info}>Name: {profile.name}</Text>
              <Text style={styles.email}>Email: {profile.email}</Text>
              <Text style={styles.info}>Credit Score: {profile.credit}</Text>
              <Text style={styles.info}>Current Requests: {postCount}</Text>
            </View>
          </View>
          <Divider
            style={{ width: '95%', margin: 20 }}
            color="black"
            width={2}
            marginBottom={0}
            orientation="horizontal"
          />
          <Text style={styles.label} marginTop={10}>Active Expenditures: {lendCount}</Text>
          <FlatList
            horizontal={true}
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            marginBottom={-30}
          />
          <Divider
            style={{ width: '95%', margin: 20 }}
            color="black"
            width={2}
            marginBottom={0}
            orientation="horizontal"
          />
          <Text style={styles.label2} marginTop={10}>Active Requests: {lendCount}</Text>

          <FlatList
            horizontal={true}
            data={DATA2}
            renderItem={({ item }) => <Item2 title={item.title} />}
            keyExtractor={item => item.id}
            marginBottom={-30}
          />
        </View>
        <Button
          title="Logout"
          onPress={() => {
            logoutUser();
            navigation.navigate('Login');
          }}></Button>
      </ScrollView>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // Increased paddingBottom to allow space for the footer
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 0,
  },
  expenditure: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 20,
  },
  request: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Georgia',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 70,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  info: {
    marginLeft: 10,
    marginBottom: 12.5,
    fontSize: 18,
  },
  email: {
    marginLeft: 10,
    marginBottom: 12.5,
    fontSize: 12.5,
  },
  label: {
    marginTop: 2,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    fontStyle: 'italic',
  },
  label2: {
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default ViewProfileScreen;