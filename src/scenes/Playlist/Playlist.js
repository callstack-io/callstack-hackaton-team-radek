import React, { Component } from "react";
import { View, Text, ListView, TouchableHighlight, Button } from "react-native";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.error(response);
    var error = new Error(response.statusText)
    error.response = response
    throw error;
  }
}

function parseJSON(response) {
  return response.json()
}

function doFetchList() {
  return fetch("http://b5503d31.eu.ngrok.io/player/list")
    .then(checkStatus)
    .then(parseJSON);
}

function doUpvote(slug) {
  return fetch(`http://b5503d31.eu.ngrok.io/player/up/${slug}`, { method: "POST" })
    .then(checkStatus);
}

function doPlay(slug) {
  return fetch("http://b5503d31.eu.ngrok.io/player/play", { method: "POST" })
    .then(checkStatus);
}

function doStop(slug) {
  return fetch("http://b5503d31.eu.ngrok.io/player/stop", { method: "POST" })
    .then(checkStatus);
}

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      songs: this.ds,
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    doFetchList()
      .then(data => {
        this.setState({ songs: this.ds.cloneWithRows(data) });
      })
      .catch(err => console.error(err));
  }

  upvote(slug) {
    doUpvote(slug)
      .then(() => this.fetchList())
      .catch(err => console.error(err));
  }

  play() {
    doPlay()
      .then(() => this.fetchList());
  }

  stop() {
    doStop()
      .then(() => this.fetchList());
  }

  render() {
    return (
      <View>
        <View>
          <Button onPress={() => this.play()} title="Play" />
          <Button onPress={() => this.stop()} title="Stop" />
        </View>
        <ListView
          dataSource={this.state.songs}
          renderRow={song =>
            <TouchableHighlight onPress={() => this.upvote(song.slug)}>
              <View>
                <Text>{song.title}</Text>
                <Text>{song.votes}</Text>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
    );
  }
}

export default Playlist;