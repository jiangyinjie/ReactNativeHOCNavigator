/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, Children, createElement, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

class NavigatorProvider extends Component {
  getChildContext() {
    return {
      navigator: this.props.navigator
    }
  }
  render() {
    return Children.only(this.props.children)
  }
}
NavigatorProvider.childContextTypes = {navigator: PropTypes.any}

const withNavigator = (mapNavigator) => (BaseComponent) => {
  class WithNavigator extends Component {
    render() {
      const actions = mapNavigator(this.context.navigator);
      return createElement(BaseComponent, {...this.props, ...actions})
    }
  }
  WithNavigator.contextTypes = {navigator: PropTypes.any}
  return WithNavigator
}

function Main({pushContent}) {
  return (
    <View style={styles.fullCenter}>
      <Text style={styles.textCenter}>Main View</Text>
      <Text style={styles.textCenter} onPress={pushContent}>Push</Text>
    </View>
  )
}

const MainWithNav = withNavigator(n=> ({
  pushContent: ()=>n.push({name: 'Content'})
}))(Main)

function Content({back}) {
  return (
    <View style={[styles.fullCenter, {backgroundColor: 'gray'}]}>
      <Text style={styles.textCenter}>Content View</Text>
      <Text style={styles.textCenter} onPress={back}>Back</Text>
    </View>
  );
}

const ContentWithNav = withNavigator(n=>({
  back: n.pop
}))(Content)

export default class NavigatorApp extends Component {
  render() {
    return (
      <Navigator
        style={styles.fullCenter}
        initialRoute={{name: 'Main'}}
        renderScene={(r,n)=>this.renderScene(r, n)}
      />
    );
  }
  renderScene(route, navigator) {
    return (
      <NavigatorProvider navigator={navigator}>
        {this.elementForScene(route)}
      </NavigatorProvider>
    )
  }
  elementForScene(route) {
    if (route.name === 'Main') {
      return <MainWithNav />
    }
    if (route.name === 'Content') {
      return <ContentWithNav />
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