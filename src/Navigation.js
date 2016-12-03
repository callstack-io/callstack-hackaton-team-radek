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

import BeaconsScreen from './scenes/Beacons/BeaconsScreen';
import ParkingSpot from "./scenes/ParkingSpot/ParkingSpot";

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
            selectedStyle={styles.selectedTab}
            >
            <ParkingSpot distanceMargin={100} />
          </TabNavigationItem>

          <TabNavigationItem
            id="second"
            title="QR Code"
            selectedStyle={styles.selectedTab}
            >
            <View style={styles.tabWrap}>
              <Text>
                QR Code
              </Text>
            </View>
          </TabNavigationItem>
        
          <TabNavigationItem
            id="beacons"
            title="Beacons Screen"
            selectedStyle={styles.selectedTab}
            >
            <View style={styles.tabWrap}>
              <BeaconsScreen style={styles.tabWrap}/>
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