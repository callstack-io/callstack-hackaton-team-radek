import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

export default class Navigation extends Component {
  static route = {
    navigationBar: {
      title: 'Tab Navigation',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TabNavigation
          id="tab-navigation"
          navigatorUID="tab-navigation"
          initialTab="first">
          <TabNavigationItem
            id="first"
            title="Parking spot"
            style={styles.row}
            selectedStyle={styles.selectedTab}
            >
            <View style={styles.tabWrap}>
              <Text>
                Parking spot
              </Text>
            </View>
          </TabNavigationItem>

          <TabNavigationItem
            id="second"
            title="QR Code"
            style={styles.row}
            selectedStyle={styles.selectedTab}
            >
            <View style={styles.tabWrap}>
              <Text>
                QR Code
              </Text>
            </View>
          </TabNavigationItem>
        </TabNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedTab: {
    backgroundColor: '#ccc',
  },
  tabWrap: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 50,
  },
});