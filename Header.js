import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Search_Bar from './searchBar.js'

const Header = () => {
  return (
    <View style={styles.header}>
        <Search_Bar></Search_Bar>        
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row'
    },
    image: {
        width: 40,
        height: 40
    }
  });  

export default Header