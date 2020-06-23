import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-gesture-handler';

// define type of property pass from search
type searchProp = {
  searchItem: string;
  onChangeSearchItem: (input: string) => void;
  onTextSubmitted: () => void;
};

export function SearchBar({
  searchItem,
  onChangeSearchItem,
  onTextSubmitted,
}: searchProp) {
  return (
    <View style={styles.searchbarContainer}>
      <Icons name="search" style={styles.iconstyle} />
      <TextInput
        placeholder="Search"
        value={searchItem} // show value on input text
        onChangeText={(text: string) => onChangeSearchItem(text)} // this attribute get calls on text change
        style={{marginHorizontal: 10, fontSize: 16, flex: 1}}
        onEndEditing={() => onTextSubmitted()} // this attribute get call when enter is hit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f0EEEE',
    borderRadius: 5,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
  },
  iconstyle: {
    fontSize: 35,
    alignSelf: 'center',
  },
});
