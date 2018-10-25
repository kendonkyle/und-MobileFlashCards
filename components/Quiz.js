import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import OpacityButton from './OpacityButton';
import { connect } from 'react-redux';
import TextButton from './TextButton';


const styles = StyleSheet.create({
  headingText: {
    fontSize: 38,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
});

class Quiz extends Component {
  state = {
    question: 0,
    score: 0,
    showAnswer: false,
    bounceValue: new Animated.Value(1),
  }

  nextClick = (correct) => {
    // debugger;
    this.setState((state)=>({
      question: state.question + 1,
      score: correct ? state.score + 1 : state.score,
    }));
  }

  restartQuiz = () => this.setState((state) => ({
    ...state,
    question: 0,
    score: 0,
    showAnswer: false,
  }));

  goToDeck = () => {
    const { deckId, navigation } = this.props;
    navigation.navigate('ViewDeck',{ deckId });
  }

  render() {
    const { question, score, showAnswer, bounceValue } = this.state;
    const { deck } = this.props;
    
    if(question > deck.questions.length-1) {
      return (
        <View style={{ flex:1, alignContent: 'center' }}>
          <Text style={styles.headingText}> Flashcards Complete </Text>
          <Text style={styles.headingText}> Your Score was {score} out of {deck.questions.length}</Text>
          <View style={{ flex:1 }}>
            <OpacityButton style={{backgroundColor: "#4AB269"}} onPress={this.restartQuiz}>
              Restart Quiz
            </OpacityButton>
          </View>
          <View style={{ flex:1 }}>
            <OpacityButton style={{backgroundColor: "#C75148"}} onPress={this.goToDeck}>
              Back To Deck
            </OpacityButton>
          </View>
        </View>
      )
    }

    return (
      <View style={{ flex:1, alignContent: 'center' }}>
      <View style={{ flex:1 }}>
        <Text>Question {question}/{deck.questions.length}</Text>
        <Text>Score :{score}</Text>
      </View>
      <View style={{flex:2}}>
      <Animated.Text style={[styles.headingText,{transform: [{scale: bounceValue}]}]}>
        {showAnswer ? deck.questions[question].answer : deck.questions[question].question }
      </Animated.Text>
      <TextButton onPress={() => {
        Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
          Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start();
        this.setState((state) => ({
          showAnswer: !state.showAnswer
        }));
        
    }}>show Answer</TextButton>
      </View>
        <View style={{ flex:1 }}>
        <OpacityButton style={{backgroundColor: "#4AB269"}} onPress={() => this.nextClick(true)}>
          Right
        </OpacityButton>
        </View>
        <View style={{ flex:1 }}>
        <OpacityButton style={{backgroundColor: "#C75148"}} onPress={() => this.nextClick(false)}>
          Wrong
        </OpacityButton>
        </View>
      </View>
    );
  }
}

function mapstateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId],
  };
}

export default connect(mapstateToProps)(Quiz);