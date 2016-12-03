import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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
            <Image style={styles.image} source={require("./assets/smile.png")} />
            <Text style={styles.status}>Spot is FREE!</Text>
          </View>
          :
          <View>
            <Image style={styles.image} source={require("./assets/cry.png")} />
            <Text style={styles.status}>Some moron took it!</Text>
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
  image: {
    marginBottom: 20,
  },
  status: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#000"
  },
});

export default ParkingSpot;