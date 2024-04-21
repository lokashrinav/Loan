import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ navigation }) => {

    const handleProfilePress = () => {
        navigation.navigate('viewProfile');
      };

  return (
    <View style={styles.footer}>
            <TouchableOpacity style={styles.profileArea} onPress={handleProfilePress}>
                <Image source={require('./user.png')}
                    style={styles.image}
                    />  
            </TouchableOpacity>
            <View style={styles.addPostArea}>
                <Image source={require('./add.png')}
                style={styles.image}
                />             
            </View>
            <View style={styles.notificationsArea}>
                <Image source={require('./notification.png')}
                style={styles.image}
                />        
            </View>      
    </View>
  )
}

const styles = StyleSheet.create({
    extraPadding: {
        width: '100%',
        height: 10,
        backgroundColor: 'rgba(57,62,66,255)',
        borderBottomWidth: 3
      },
    seperator: {
        height: '126%',
        width: 2,
        backgroundColor: 'black',
    },
    footer: {
        backgroundColor: 'lightgray',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        top: 665,
        left: 0,
        right: 0,
    },
    profileArea: {
        width: '33.33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPostArea: {
        width: '33.33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationsArea: {
        width: '33.33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40
    },
    align: {
        flexDirection: 'row'
    }
  });  

export default Footer