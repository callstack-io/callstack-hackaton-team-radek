import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 22,
  },
  garbageMaster: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#97ee6d"
  }
});

export default class Row extends Component {
  render() {
    const now = moment()
    let fromDate = moment(this.props.from, "DD-MM-YYYY")
    // fromDate = new Date(fromDate[2], fromDate[1], fromDate[0])
    let toDate =  moment(this.props.to, "DD-MM-YYYY")
    // toDate = new Date(toDate[2], toDate[1], toDate[0])
    return (
      <View style={(now.isAfter(fromDate) && now.isBefore(toDate)) ? styles.garbageMaster : styles.container}>
        <Text style={styles.text}>{this.props.name+":"}</Text>
        <Text style={styles.text}>{this.props.from}</Text>
        <Text style={styles.text}>{this.props.to}</Text>
      </View>
    )
  }


}
