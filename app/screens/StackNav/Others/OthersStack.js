import React from 'react';
import {
  createStackNavigator
} from 'react-navigation';

// Screens
import Others from '../../Others/Others';
import About from '../../About/About';
import ChangePassword from '../../Account/change_password_screen';
import TermsCondition from '../../TermsCondition/TermsCondition';

const OthersStack = createStackNavigator({
  Others: {
    screen: Others,
    navigationOptions: ({navigation}) => ({
      title: 'ផ្សេងៗ'
    }),
  },
  About: {
    screen: About,
    navigationOptions: ({navigation}) => ({
      title: 'អំពីកម្មវិធី'
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  TermsCondition: {
    screen: TermsCondition,
    navigationOptions: ({navigation}) => ({
      title: 'Terms & Condition'
    }),
  }
}, {
  initialRouteName: 'Others',
});

OthersStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default OthersStack;
