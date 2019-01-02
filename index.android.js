import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
} from 'react-native';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import App from './app';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Kantumruy',
    color: '#111'
  }
};
const customTextInputProps = {
  style: {
    fontFamily: 'Kantumruy',
    fontSize: 16,
    height: 48,
    lineHeight: 48,
  }
};

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);

export default class TreyVisay extends Component {
  render() {
    return(<App />)
  }
}

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
