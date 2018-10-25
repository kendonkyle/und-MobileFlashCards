import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { primary, secondary } from '../utils/colors';
import OpacityButton from './OpacityButton';
import { addDeckByTitle } from '../utils/helpers';
import { addDeck } from '../actions';

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

  saveDeck = () => {
    addDeckByTitle(this.state.deckname);
    this.props.dispatch(addDeck(this.state.deckname));
    const key = this.state.deckname.replace(/\s/g, '');
    this.props.navigation.navigate('ViewDeck',{ deckId: key });
    this.setState((state) => ({
      deckname: ""
    }));
  }
  
  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignContent: 'center', padding: 12}} 
        behavior="padding" 
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        enabled>
        <Text style={styles.headingText}>Create A New Deck</Text>
        <Text style={styles.subheadingText} >Please Type a name for you new deck</Text>
        <TextInput style={styles.decknameInput} value={this.state.deckname} onChangeText={(text) => this.setState({deckname: text})} />

        {/* <OpacityButton style={{alignSelf: 'baseline'}} */}
        <OpacityButton
          onPress={this.saveDeck} >
          Add Deck
          </OpacityButton>
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default connect()(AddDeck);