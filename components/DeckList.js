import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
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
    <DeckListItem deckName={item.title} cardCount={5} 
      onPress={() => { alert(item.key); this.props.navigation.navigate(
          'ViewDeck',
          { deckId: item.key },);} }
        // () => this.props.navigation.navigate(
        //   'ViewDeck',
        //   { deck: item },
        // )} 
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
  //TODO format decks
  let data = [];
  console.log("in mapstatetoprops");
  if(typeof decks !== 'undefined')  {
    console.log(JSON.stringify(decks));
    Object.keys(decks).forEach((key) => {
      data.push({ key, ...decks[key] });
    });
  }
  return {
    decks: data
  };
}

export default connect(mapstateToProps)(DeckList);