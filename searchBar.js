import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, Image, StyleSheet } from 'react-native';

const Search_Bar = () => {
    const [search, setSearch] = React.useState('');
    
    const updateSearch = (searchValue) => {
        setSearch(searchValue);
    };

    return (
        <View style={styles.searchBar}>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchStyle}
        />
        </View>

    );
}

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        height: '100%',
    },
    searchStyle: {
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    }
});

export default Search_Bar;