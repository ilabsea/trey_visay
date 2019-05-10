import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import headerStyles from '../../assets/style_sheets/header';
import SaveButton from '../../components/shared/save_button';

import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';
import IntroStack from './intro_stack';
import HomeScreen from '../home';
import Register from '../Account/register';
import CareerCounsellorStack from './CareerCounsellor/CareerCounsellorStack';

const AccountStack = createStackNavigator(
  {
    Intro: {
      screen: IntroStack,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
    Login: { screen: Login },
    Home: {
      screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
    Register: { screen: Register },
    ProfileForm: {
      screen: ProfileForm,
      navigationOptions: ({ navigation }) => ({
        title: 'បំពេញប្រវត្តិរូបសង្ខេប',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerRight: (<SaveButton navigation={navigation}/>),
      })
    },
    CareerCounsellorStack: {
      screen: CareerCounsellorStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'Intro',
  }
);

export default AccountStack;
