/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

function Main({navigator}) {
  const pushContent = ()=>navigator.push({
    name: 'Content',
  });
  return (
    <View style={styles.fullCenter}>
      <Text style={styles.textCenter}>Main View</Text>
      <Text style={styles.textCenter} onPress={pushContent}>Push</Text>
    </View>
  )
}

function Content({navigator}) {
  const back = navigator.pop
  return (
    <View style={[styles.fullCenter, {backgroundColor: 'gray'}]}>
      <Text style={styles.textCenter}>Content View</Text>
      <Text style={styles.textCenter} onPress={back}>Back</Text>
    </View>
  );
}

export default class NavigatorApp extends Component {
  render() {
    return (
      <Navigator
        style={styles.fullCenter}
        initialRoute={{name: 'Main'}}
        renderScene={this.renderScene}
      />
    );
  }
  renderScene(route, navigator) {
    if (route.name === 'Main') {
      return <Main navigator={navigator}/>
    }
    if (route.name === 'Content') {
      return <Content navigator={navigator}/>
    }
  }
}


const styles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center'
  }
})