
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Listing from './src/listing'
import Details from './src/details'

const MyStack = createStackNavigator({
  Listing: {
    screen: Listing,
    navigationOptions: {
      title: 'Listing',
      headerShown: false
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Capital Weather'
    }
  }
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center'
  }
})

const AppContainer = createAppContainer(MyStack);
class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  };
}

export default App;

