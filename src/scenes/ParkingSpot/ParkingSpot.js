import React, { Component } from "react";
import { View, Text } from "react-native";

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
      const spotFree = data.sonic.status > 100;
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
      <View>
        {this.state.spotFree ?
          <Text>Spot free</Text>
          :
          <Text>Fuck you!</Text>
        }
      </View>
    )
  }
}

export default ParkingSpot;