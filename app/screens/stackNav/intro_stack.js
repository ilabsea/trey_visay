import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import BackButton from '../../components/back_button';

import IntroScreen from '../Account/intro';

const IntroStack = createStackNavigator(
  {
    Intro: {
      screen: IntroScreen,
      navigationOptions: ({navigation}) => ({
        title: 'សេចក្តីណែនាំ',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerLeft: <BackButton navigation={navigation}/>
      })
    }
  }
);


export default IntroStack;
