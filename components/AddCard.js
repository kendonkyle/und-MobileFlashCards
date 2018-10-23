import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, Button } from 'react-native';
import { primary, secondary } from '../utils/colors';
import OpacityButton from './OpacityButton';

const styles = StyleSheet.create({
  headingText: {
    fontSize: 38,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
  subheadingText: {
    textAlign: "left",
    marginLeft: 12,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  qaInput: {
    margin: 12,
    fontSize: 24,
  }
});

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  }
  render() {
    return (
      <View style={{flex: 1, alignContent: 'center'}}>

        <Text style={styles.headingText}>Add A Card To Deck</Text>
        <Text style={styles.subheadingText} >Question</Text>
        <TextInput style={styles.qaInput} value={this.state.question} onChangeText={(text) => this.setState({question: text})} />
        <Text style={styles.subheadingText} >Answer</Text>
        <TextInput style={styles.qaInput} value={this.state.answer} onChangeText={(text) => this.setState({answer: text})} />
        <OpacityButton 
          onPress={()=>{
            alert("Creating new Question");
          }} >
          Add Card to Deck
          </OpacityButton>

      </View>
    )
  }
}

export default AddCard;