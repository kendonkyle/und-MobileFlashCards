import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DeckListItem from './DeckListItem';
import { connect } from 'react-redux';
import { getDecks } from '../utils/helpers';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})));
    }

  renderItem = ({item}) => (
    <DeckListItem deckName={item.title} cardCount={item.questions.length} 
      onPress={() => {this.props.navigation.navigate(
          'ViewDeck',
          { deckId: item.key },);} }
    />
  );
  
  // onPress = (item) => {
  //   this.props.navigation.navigate(
  //     'ViewDeck',
  //     { deck: item },
  // )};

  render() {
    const { decks } = this.props;
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    if(decks.length < 1) {
      return (
        <View style={{flex:1, alignContent:'center', alignItems: 'center'}}>
          <Text>Hello.. Please Add a Deck First</Text>
        </View>);
    }
    return (
      <View style={{flex: 1}}>
      <FlatList
        data={ decks }
        renderItem={this.renderItem}
      />
      </View>
    )
  }
}

function mapstateToProps(decks) {
  let data = [];
  if(typeof decks !== 'undefined')  {
    // console.log(JSON.stringify(decks)); 
    Object.keys(decks).forEach((key) => {
      data.push({ key, ...decks[key] });
    });
  }
  return {
    decks: data
  };
}

export default connect(mapstateToProps)(DeckList);