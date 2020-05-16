import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Screen from '../components/Screen';

export default class LandingScreen extends Screen {
  static navigationOptions = {
    title: 'Audio Player POC',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Track Player POC</Text>
        <TouchableOpacity onPress={() => this.navigateTo('Playlist')}>
          <Text>Playlist Drawer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
