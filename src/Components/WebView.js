import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

class WebViewComponent extends Component {
  render() {
    return <WebView source={{uri: `${this.props.route.params.url}`}}></WebView>;
  }
}

const styles = StyleSheet.create({});

export default WebViewComponent;
