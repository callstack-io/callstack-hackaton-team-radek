import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter
} from 'react-native';

import Beacons from 'react-native-ibeacon';

export default class BeaconsScreen extends Component {
    render() {
        return (
            <View>
                <Text>
                    Becons Screen
                </Text>
            </View>
        )
    }

    componentWillMount() {
        Beacons.requestWhenInUseAuthorization();

        const region = {
            identifier: 'Callstack',
            uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
        };

        const majorIDs = [38488, 32301];

        Beacons.startRangingBeaconsInRegion(region);
    }

    componentDidMount() {
        
    }
}