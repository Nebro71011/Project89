import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class LogoutScreen extends Component {
  componentDidMount(){
    firebase.auth().signOut();
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text>Logout Screen</Text>
      </View>
    );
  }
}
