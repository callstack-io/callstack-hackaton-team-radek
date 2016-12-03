import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ParkingSpot extends Component {  
  state = {
    connected: false,
    connecting: false,
  };

  componentWillMount() {
    this.ws = new WebSocket("ws://192.168.1.47:1880/ws/sensors");
    this.handleOpenAttempt();
    this.ws.onopen = this.handleOpen;
    this.ws.onmessage = this.handleMessage;
    this.ws.onclose = this.handleClose;
  }

  handleOpenAttempt() {
    this.setState({ connecting: true, connected: false });
  }

  handleOpen = () => {
    this.setState({ connecting: false, connected: true });
  }

  handleMessage = (event) => {
    const data = JSON.parse(event.data);
    if (!data) throw new Error("Sensor data isn't a valid JSON");
    
    if (data.sonic) {
      const spotFree = data.sonic.status > this.props.distanceMargin;
      this.setState({ spotFree });
    }
  };

  handleClose = () => {
    this.ws.close();
  };

  componentWillUnmount() {
    if (this.ws) {
      this.handleClose();
    }
  }

  render() {
    return (
      <View 
        style={[
          styles.container,
          this.state.spotFree ? styles.spotFree : styles.spotTaken
        ]}
      >
        {this.state.spotFree ?
          <View>
            <Text>Spot free</Text>
          </View>
          :
          <View>
            <Text>Fuck you!</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spotFree: {
    backgroundColor: "#14e881",
  },
  spotTaken: {
    backgroundColor: "#ff4f4f",
  },
});

export default ParkingSpot;