import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { primary, primaryLight, secondary, black, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import { Constants } from 'expo';

const Tabs = createBottomTabNavigator({
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={30} color={tintColor} />
    }
  },
  // DeckList: {
  //   screen: DeckList,
  //   navigationOptions: {
  //     title: 'Decks',
  //     tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={30} color={tintColor} />
  //   }
  // },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
},
{
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'iso' ? primaryLight : black,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : primaryLight,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
});

function AppStatusBar({ backgroundColor, ...props })  {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }} >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <AppStatusBar backgroundColor={primary} />
        {/* <MainNavigator /> */}
        <Tabs />
        {/* <DeckList /> */}
        {/* <AddDeck /> */}
        {/* <Text>Open up App.js to start working on your app!</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}); 
