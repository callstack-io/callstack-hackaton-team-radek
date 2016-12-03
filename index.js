/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

import Navigation from './src/Navigation';

const Router = createRouter(() => ({
  home: () => HomeScreen,
}));

class teamRadek extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <Navigation />
        </NavigationProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('teamRadek', () => teamRadek);
