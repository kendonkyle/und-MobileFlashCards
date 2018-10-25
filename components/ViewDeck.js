import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import { primary, secondary, secondaryDark, secondaryLight } from '../utils/colors';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import OpacityButton from './OpacityButton';
import { deleteDeck } from '../utils/helpers';
import { removeDeck } from '../actions';

const styles = StyleSheet.create({
  headingText: {
    fontSize: 38,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  subheadingText: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 30
  },
  decknameInput: {
    margin: 12,
    fontSize: 28,
  }
});

class ViewDeck extends Component {
  
  removeDeck = () => {
    const { deckId } = this.props;
    this.props.dispatch(removeDeck(deckId));
    this.props.navigation.goBack();
    deleteDeck(deckId);
  }

  

  render() {
    debugger
    const { deckId, deck } = this.props;
    if(typeof deck === 'undefined') {
      return (<View><Text>Invalid Deck</Text></View>)
    }
    return (
      <View style={{flex: 1, alignContent: 'center'}} padding={8}>
      <View style={{flex: 3}}>
        <View style={{flex:2}}>
          <Text style={[styles.headingText,{flex:2}]}>{deck.title}</Text>
          <Text style={[styles.subheadingText,{flex:1}]} >{deck.questions.length} Card{(deck.questions.length != 1) && "s"} </Text>
        </View>
        <View style={{borderBottomColor: secondaryLight, borderBottomWidth: 1, height: 10, flex:1}} />
      </View>
      <View style={{ flex:1 }}>
        <OpacityButton
          onPress={()=> this.props.navigation.navigate( 'AddCard', {deckId: deckId})} >
          Add Card
          </OpacityButton>
      </View>
      <View style={{ flex:1 }}>
          <OpacityButton 
          onPress={()=>{ this.props.navigation.navigate( 'Quiz', {deckId: deckId}) }} >
          Start Quiz
          </OpacityButton>
      </View>
          <TextButton onPress={this.removeDeck} style={{color: "red"}}>Remove Deck</TextButton>
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