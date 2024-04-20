import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Search_Bar from './searchBar.js'

const Header = () => {
  return (
    <View style={styles.header}>
        <Search_Bar></Search_Bar>
        <View style={styles.messageArea}>
            <View>
                <Image source={require('./chat.png')}
                style={styles.image}/>
            </View>

        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row'
    },

    messageArea: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(57,62,66,255)'
    },
    image: {
        width: 40,
        height: 40
    }
  });  

export default Header