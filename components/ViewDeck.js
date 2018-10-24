import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import { primary, secondary, secondaryDark, secondaryLight } from '../utils/colors';
import { connect } from 'react-redux';
// import TextButton from './TextButton';
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

class ViewDeck extends Component {
  
  render() {
    debugger
    const { deckId, deck } = this.props;
    alert(deckId);
    if(typeof deck === 'undefined') {
      return (<View><Text>Invalid Deck</Text></View>)
    }
    // const deck = { title: "My Deck", questions: [ { 
    //   question: 'What is a closure?',
    //   answer: 'The combination of a function and the lexical environment within which that function was declared.'
    // } ]};
    return (
      <View style={{flex: 1, alignContent: 'center'}} padding={8}>
        <Text style={styles.headingText}>{deck.title}</Text>
        <Text style={styles.subheadingText} >{deck.questions.length} Card{(deck.questions.length != 1) && "s"} </Text>
        <View style={{borderBottomColor: secondaryLight, borderBottomWidth: 1, height: 10 }} />
        <OpacityButton 
          onPress={()=>{
            alert("Creating new Deck");
          }} >
          Add Card
          </OpacityButton>
          <OpacityButton 
          onPress={()=>{
            alert("Creating new Deck");
          }} >
          Start Quiz
          </OpacityButton>
      </View>
    )
  }
}

function mapStateToProps( state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId],
  };
}


export default connect(mapStateToProps)(ViewDeck);