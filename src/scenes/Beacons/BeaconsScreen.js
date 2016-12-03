import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  ListView,
} from 'react-native';


const Beacons = Platform.select({
    ios: () => require('react-native-ibeacon'),
    android: () => require('react-native-beacons-android'),
})();

const majorIDs = [38488, 32301];

const beaconsData = [
    {
        major: 38488,
        name: 'Toilet 01',
        description: 'Second floor, next to the elevator'
    },
    {
        major: 32301,
        name: 'Toilet 02',
        description: 'First floor, next to the kitchen'
    }
];

const exampleResponse = [
    {
        major: 38488,
        proximity: 'near',
    },
    {
        major: 32301,
        proximity: 'immediate',
    },
    {
        major: 12345,
        proximity: 'far',
    },
];

export default class BeaconsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        }
    }

    render() {
        let { dataSource } =  this.state;

        if(!dataSource) {
            dataSource = exampleResponse;
        }

        let closestBeacon = null;
        dataSource.forEach((beacon, index) => {
            console.log('data: ', beacon);
            beacon.becaonName = 'undefined';

            beaconsData.forEach(becaon => {
                if(becaon.major === beacon.major) {
                    beacon.becaonName = becaon.name;
                    beacon.beaconDescription = becaon.description;
                }
            });

            beacon.beaconClass = 'beacon' + beacon.proximity;

            if(beacon.proximity === 'immediate') {
                beacon.distance = 0;
            } else if(beacon.proximity === 'near') {
                beacon.distance = 1;
            } else if(beacon.proximity === 'far') {
                beacon.distance = 2;
            } else {
                beacon.distance = 3;
            }

            if(!closestBeacon) {
                closestBeacon = beacon;
            } else if(beacon.distance < closestBeacon.distance) {
                closestBeacon = beacon;
            }
        });
        
        return (
            <View style={[styles.beaconData, styles[closestBeacon.beaconClass]]}>
                <Text style={styles.beaconText}>{ closestBeacon.becaonName }</Text>
                <Text style={styles.beaconText}>{ closestBeacon.beaconDescription }</Text>
                <Text style={styles.beaconText}>distance: { closestBeacon.proximity }</Text>
            </View>
        )
    }

    componentDidMount() {
        const region = {
            identifier: 'Callstack',
            uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
        };

        if(Platform.OS === 'ios') {
            Beacons.requestWhenInUseAuthorization();
            Beacons.startRangingBeaconsInRegion(region);

        } else {
            Beacons.detectIBeacons();

            Beacons
              .startRangingBeaconsInRegion(region.identifier, region.uuid)
              .then(
                () => console.log('Beacons ranging started succesfully')
              )
              .catch(
                error => console.log(`Beacons ranging not started, error: ${error}`)
              );
        }

        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            this.setState({
              dataSource: data.beacons
            });
        });
    }
}

const styles = StyleSheet.create({
    beaconData: {
        flex: 1,
        padding: 20,
    },
    beaconimmediate: {
        backgroundColor: '#14e881',
    },
    beaconnear: {
        backgroundColor: '#faa200',
    },
    beaconfar: {
        backgroundColor: '#ff4f4f',
    },
    beaconText: {
        margin: 10,
        fontSize: 26,
        fontWeight: 'bold',
    }
});

