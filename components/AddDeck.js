import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, Platform, Button } from 'react-native';
import { primary, secondary } from '../utils/colors';
import TextButton from './TextButton';
import OpacityButton from './OpacityButton';

const styles = StyleSheet.create({
  headingText: {
    fontSize: 38,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
  subheadingText: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30
  },
  decknameInput: {
    margin: 12,
    fontSize: 28,
  }
});

class AddDeck extends Component {
  state = {
    deckname: ""
  }
  render() {
    return (
      <View style={{flex: 1, alignContent: 'center'}}>

        <Text style={styles.headingText}>Create A New Deck</Text>
        <Text style={styles.subheadingText} >Please Type a name for you new deck</Text>
        <TextInput style={styles.decknameInput} value={this.state.deckname} onChangeText={(text) => this.setState({deckname: text})} />
        <OpacityButton 
          onPress={()=>{
            alert("Creating new Deck");
          }} >
          Add Deck
          </OpacityButton>

      </View>
    )
  }
}

export default AddDeck;