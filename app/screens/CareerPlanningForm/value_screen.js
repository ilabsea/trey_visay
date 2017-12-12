import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import RadioGroup from '../../components/radio_group';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import valueJobs from '../../data/json/value_jobs';

export default class ValueScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញគុណតម្លៃ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញគុណតម្លៃ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    this._checkValidation();
  }

  _checkValidation() {
    this._handleSubmit();
  }

  _handleSubmit() {
    // realm.write(() => {
    //   realm.create('GeneralSubject', this._buildData(), true);
    //   // alert(JSON.stringify(realm.objects('GeneralSubject')[realm.objects('GeneralSubject').length -1]));
      this.props.navigation.navigate('PersonalityScreen');
    // });
  }

  _buildData() {
    // let obj = Object.assign({}, this.state, {
    //   // uuid: uuidv4()
    //   uuid: '123',
    //   userUuid: User.getID()
    // })
    // return obj;
  }

  _renderValue(groupNumber) {
    let group = valueJobs[groupNumber];
    let title = group.text;
    let description = group.description;

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ValueJobsScreen', {groupNumber: groupNumber})}
        style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              { this._renderValue(0) }
              { this._renderValue(1) }
              { this._renderValue(2) }
            </View>

          </ScrollView>
          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
