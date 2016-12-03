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
import QRCode from './scenes/QRCode/QRCode'

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
              <QRCode data={{"schedule": {
                "wojteg": {"from": "01.01.2017","to": "07.01.2017"},
                "dratwa": {"from": "02.12.2016","to": "14.12.2016"},
                "ferran": {"from": "15.01.2017","to": "21.01.2017"},
                "pawlucci": {"from": "22.01.2017","to": "31.01.2017"}
              }}}/>
          </TabNavigationItem>
          <TabNavigationItem
            id="beacons"
            title="Toilets"
            selectedStyle={styles.selectedTab}
          >
            <BeaconsScreen style={styles.tabWrap}/>
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