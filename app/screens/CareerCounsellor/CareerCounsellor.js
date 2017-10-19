import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import { ThemeProvider, Button } from 'react-native-material-ui';

// const uiTheme = {
//     palette: {
//         primaryColor: 'red',
//     },
//     toolbar: {
//         container: {
//             height: 50,
//         },
//     },
// };

export default class CareerCounsellor extends Component {
  static navigationOptions = {
    drawerLabel: 'CareerCounsellor',
    headerTitle: 'Career Counsellor',

  };

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={styles.wrapper}>
          <View style={{height: 50}}>
            <Button raised primary text="Personal Understanding" onPress={() => this.goToPersonalUnderstandingForm() } />
          </View>

          <View style={{height: 50}}>
            <Button raised primary text="Planning a future career" />
          </View>

          <View style={{height: 50}}>
            <Button raised primary text="Recommendation list" />
          </View>

        </View>
      </ThemeProvider>
    );
  }

  goToPersonalUnderstandingForm(){
    this.props.navigation.navigate('PersonalUnderstandingFormScreen');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1
  },

  icon: {
    width: 24,
    height: 24,
  },
});