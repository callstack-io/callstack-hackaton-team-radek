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

export default class BeaconsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        }
    }

    render() {
        const { dataSource } =  this.state;

        let dataSourceList = null;
        if(dataSource) {
            dataSourceList = dataSource.map((data) => {
                console.log('data: ', data);
                return (
                    <Text>{ data }</Text>
                )
            });
        }

        return (
            <View>
                <Text>
                  All beacons in the area: 
                </Text>
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

        const majorIDs = [38488, 32301];

        Beacons.startRangingBeaconsInRegion(region);
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data.beacons)
            });
        });
    }
}

