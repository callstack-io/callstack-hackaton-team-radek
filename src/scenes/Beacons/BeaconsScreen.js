import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  ListView,
} from 'react-native';

import Beacons from 'react-native-ibeacon';

const majorIDs = [38488, 32301];

const beaconsData = [
    {
        major: 38488,
        name: 'room 1'
    },
    {
        major: 32301,
        name: 'room 2'
    }
];

const exampleResponse = [
    {
        major: 38488,
        proximity: 'Near',
    },
    {
        major: 32301,
        proximity: 'Immediate',
    },
    {
        major: 12345,
        proximity: 'Far',
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

        const dataSourceList = dataSource.map((data, index) => {
            console.log('data: ', data);
            let becaonName = 'undefined';

            beaconsData.forEach(becaon => {
                if(becaon.major === data.major) {
                    becaonName = becaon.name;
                }
            });

            const beaconClass = 'beacon' + data.proximity;

            return (
                <View style={[styles.beaconData, styles[beaconClass]]} key={index}>
                    <Text style={styles.beaconText}>name: { becaonName }</Text>
                    <Text style={styles.beaconText}>distance: { data.proximity }</Text>
                </View>
            )
        });
        
        return (
            <View>
                { dataSourceList }
            </View>
        )
    }

    componentWillMount() {
        Beacons.requestWhenInUseAuthorization();

        const region = {
            identifier: 'Callstack',
            uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
        };

        Beacons.startRangingBeaconsInRegion(region);
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            this.setState({
              dataSource: data.beacons
            });
        });
    }
}

const styles = StyleSheet.create({
    beaconData: {
        padding: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    beaconImmediate: {
        backgroundColor: '#0f0',
    },
    beaconNear: {
        backgroundColor: '#faa200',
    },
    beaconFar: {
        backgroundColor: '#f00',
    },
    beaconText: {
        margin: 10
    }
});

