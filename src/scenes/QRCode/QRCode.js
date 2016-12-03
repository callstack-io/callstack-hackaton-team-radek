import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  ListView,
} from 'react-native';

import Row from './Row'

export default class QRCode extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.parseJSON())
      // trashData: this.parseJSON()
    }
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row name={rowData.name} from={rowData.dates.from} to={rowData.dates.to} />}
        />
      </View>
    )
  }

  parseJSON() {
    const dataKeys = Object.keys(this.props.data.schedule)
    const data = [];
    for (name of dataKeys) {

      data.push({
        name: name,
        dates: this.props.data.schedule[name]
      })
    }
    return data
  }
}