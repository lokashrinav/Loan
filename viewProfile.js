import * as React from 'react';
import { Divider } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';

const ViewProfileScreen = ({ route }) => {
  const { profile } = route.params;

  const loansData = require('./tempData.json');

  let postCount = 0
  let lendCount = 0

  for (let i in loansData.users) {
    if (profile.id == loansData.recepientid) {
      postCount += 1
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

  const Item = ({title}) => (
    <View style={styles.container}>
      <View style={styles.expenditure}>
        <Image source={{ uri: profile.profileImage }} style={styles.image} />
        <View alignItems='center'>
          <Text style={styles.info}>Name: {profile.name}</Text>
          <Text style={styles.email}>Email: {profile.email}</Text>
          <Text style={styles.info}>Credit Score: {profile.credit}</Text>
          <Text style={styles.info}>Current Requests: {postCount}</Text>
        </View>
      </View>
    </View>
  );

  const Item2 = ({title}) => (
    <View style={styles.container}>
      <View style={styles.request}>
        <Image source={{ uri: profile.profileImage }} style={styles.image} />
        <View alignItems='center'>
          <Text style={styles.info}>Name: {profile.name}</Text>
          <Text style={styles.email}>Email: {profile.email}</Text>
          <Text style={styles.info}>Credit Score: {profile.credit}</Text>
          <Text style={styles.info}>Current Requests: {postCount}</Text>
        </View>
      </View>
    </View>
  ); 

  return (
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
          style={{ width: "95%", margin: 20 }}
          color="black"
          width={2}
          marginBottom = {7}
          orientation="horizontal"
        />
        <Text style={styles.label}>Active Expenditures: {lendCount}</Text>
        <FlatList
          horizontal = {true}
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          marginBottom={-30}
        />
        <Divider
          style={{ width: "95%", margin: 20 }}
          color="black"
          width={2}
          marginBottom = {7}
          orientation="horizontal"
        />
        <Text style={styles.label2}>Active Requests: {lendCount}</Text>
        <FlatList
          horizontal = {true}
          data={DATA2}
          renderItem={({item}) => <Item2 title={item.title} />}
          keyExtractor={item => item.id}
          margin={0}
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
  profile: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
  },
  expenditure: {
    flexDirection: 'row',
    backgroundColor: 'beige',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 0,
  },
  request: {
    flexDirection: 'row',
    backgroundColor: '#FFE4C4',
    padding: 20,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 0,
  },
  title: {
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Georgia'
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 50,
    width: '95%',
    alignItems: 'center',
    backgroundColor: 'beige',
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
  info2: {
    marginLeft: 10,
    marginBottom: 12.5,
    fontSize: 18,
  },
  label: {
    marginTop: 2,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  label2: {
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  email: {
    marginLeft: 10,
    marginBottom: 12.5,
    fontSize: 12.5,
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
    fontSize: 16,
    marginBottom: 10,
  },
  amountInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 300,
    marginTop: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ViewProfileScreen;