import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import DeckListItem from './DeckListItem';


class DeckList extends Component {

  renderItem = ({item}) => (
    <DeckListItem deckName={item.title} cardCount={5} />
  )

  onPress = () => {

  }

  render() {
    return (
      <View style={{flex: 1}}>
      <FlatList
        data={
          [
            { key: 'React', title: 'React', questions:[1,2,3,4]},
            { key: 'React-Native', title: 'React-Native', questions:[1,2,3,4,6,7,8,9]},
            { key: 'PHP', title: 'PHP', questions:[1,2,3,4]},
            {key: 'Maths', title:'Maths', questions:[6,6,7,7,8,8]}
          ]}
        renderItem={this.renderItem}
        
      />
      </View>
    )
  }
}

export default DeckList;