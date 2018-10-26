import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { white, primary, primaryLight } from '../utils/colors';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 6,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.94)',
    shadowOffset: {
      width: 3,
      height: 5
    },
  },
  headingText: {
    fontSize: 38,
    paddingTop: 20,
    paddingBottom: 20,
  },
  subheadingText: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    color: primaryLight
  },

})

export default function DeckListItem({deckName, cardCount, onPress}) {
  //  const {deckName, cardCount} = this.props;
   return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.headingText}>{deckName}</Text>
        <Text style={styles.subheadingText}>{cardCount} Card{cardCount !== 1 && 's'}</Text>
      </View>
      </TouchableOpacity>
    
  )
}