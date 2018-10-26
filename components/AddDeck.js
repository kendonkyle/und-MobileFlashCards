import React, { Component } from 'react';
import { 
  TextInput,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert } from 'react-native';
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
  },
  iosDecknameInput: {
    margin: 12,
    fontSize: 28,
    borderBottomColor: primary,
    borderBottomWidth: 1,
  },
});

class AddDeck extends Component {
  state = {
    deckname: ""
  }

  saveDeck = () => {
    if(this.state.deckname.length > 1)  {
      addDeckByTitle(this.state.deckname);
      this.props.dispatch(addDeck(this.state.deckname));
      const key = this.state.deckname.replace(/\s/g, '');
      this.props.navigation.navigate('ViewDeck',{ deckId: key });
      this.setState((state) => ({
        deckname: ""
      }));
    } else {
      Alert.alert(
        'No Deck Name',
        'The name of your deck has to be at least 2 characters long'
      );
    }
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
        <TextInput placeholder="Name your deck"
          style={Platform.OS === 'ios' ? styles.iosDecknameInput : styles.decknameInput}
          value={this.state.deckname} 
          onChangeText={(text) => this.setState({deckname: text})}
        />

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