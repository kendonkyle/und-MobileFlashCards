import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { primary, secondary } from '../utils/colors';
import OpacityButton from './OpacityButton';
import { addCardToDeck } from '../utils/helpers';
import { addQuestion } from '../actions';

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
    fontSize: 14,
    padding: 4,
  },
  qaIosInput: {
    margin: 12,
    fontSize: 14,
    padding: 4,
    borderBottomColor: primary,
    borderBottomWidth: 1
  }
});

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  }

  submitAddCard = () => {
    const { deckId } = this.props;
    if(this.state.question.length > 2 && this.state.answer.length > 2) {
      this.props.dispatch(addQuestion(deckId, this.state));
      addCardToDeck(deckId, this.state);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView style={{flex: 1}}  behavior="padding" enabled>
      {/* <View style={{flex: 1, alignContent: 'center'}}> */}
        <Text style={styles.headingText}>Add A Card To Deck</Text>
        <Text style={styles.subheadingText} >Question</Text>
        <TextInput 
          style={Platform.OS === 'ios' ? styles.qaIosInput : styles.qaInput}
          value={this.state.question} onChangeText={(text) => this.setState({question: text})}
        />
        <Text style={styles.subheadingText} >Answer</Text>
        <TextInput 
          style={Platform.OS === 'ios' ? styles.qaIosInput : styles.qaInput} 
          value={this.state.answer} onChangeText={(text) => this.setState({answer: text})}
        />
        <OpacityButton 
          onPress={this.submitAddCard} >
          Add Card to Deck
          </OpacityButton>
          <View style={{ height: 10 }} />
      {/* </View> */}
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

function mapStateToProps( state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
}

export default connect(mapStateToProps)(AddCard);