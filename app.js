'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Task from './app/utils/task';
import realm from './app/db/schema';

// Screens
import HomeScreen from './app/screens/home';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
}, {
  initialRouteName: 'Home',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handlerPredefinedUser();
  }

  componentDidMount(){
    Task.configBackgroundFetch();
    // Task.syncToServer();
  }

  handlerPredefinedUser() {
    let uuid = '0335745d-daa3-485b-bc0f-3610db5udemo';
    let predefinedUser = realm.objects('User').filtered('uuid="' + uuid + '"')[0];

    if (!!predefinedUser) { return; }

    realm.write(() => {
      realm.create('User', { uuid: uuid, fullName: 'Demo', username: 'Demo', password: '123456', dateOfBirth: Date()}, true);
    });
  }

  render() {
    return (<HomeNavigator/>);
  }
}
