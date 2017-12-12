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

import CheckboxGroup from 'react-native-checkbox-group';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import personalityJobs from '../../data/json/personality_jobs';

let groups = {};

export default class PersonalityScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'បំពេញបុគ្គលិកលក្ខណៈ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>បំពេញបុគ្គលិកលក្ខណៈ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };

  componentWillMount() {
    groups = {
      group1: [],
      group2: [],
      group3: [],
      group4: [],
      group5: [],
      group6: [],
    }
  }

  _renderCheckBoxes(group) {
    let title = "ខ្ញុំគិតថា ខ្លួនខ្ញុំគឺជាមនុស្ស……";
    let checkboxes = personalityGroup[group];

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>{title}</Text>

        <View>
          <CheckboxGroup
            callback={(selected) => this._handleChecked(group, selected)}
            iconColor={"#4caf50"}r
            iconSize={30}
            checkedIcon="ios-checkbox-outline"
            uncheckedIcon="ios-square-outline"
            checkboxes={checkboxes}
            labelStyle={{
              color: '#333',
              fontSize: 16,
              marginLeft: 10
            }}
            rowStyle={{
              flexDirection: 'row',
              borderTopWidth: 0.5,
              borderColor: '#ccc',
              paddingVertical: 8,
            }}
            rowDirection={"column"}
          />
        </View>
      </View>
    )
  }

  _handleSetState(groupNumber, value) {
    let group = {...this.state[groupNumber]};
    group[stateName] = value;

    let obj = {...this.state};
    obj[groupNumber] = group;

    this.setState(obj);
  }

  _handleChecked(group, value) {
    let obj = {};
    obj[group] = value;
    groups[group] = value;
  }

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
      this.props.navigation.navigate('SummaryScreen');
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

  _renderPersonality(groupNumber) {
    let group = personalityJobs[groupNumber];
    let title = group.text;
    let description = group.description;

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('PersonalityJobsScreen', {groupNumber: groupNumber})}
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
              { this._renderPersonality(0) }
              { this._renderPersonality(1) }
              { this._renderPersonality(2) }
            </View>

          </ScrollView>
          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
