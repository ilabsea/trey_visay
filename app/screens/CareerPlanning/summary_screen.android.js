import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import CheckboxGroup from '../../components/checkbox_group';
import RadioButtonGroup from '../../components/radio_button_group';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import FooterBar from '../../components/FooterBar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../assets/style_sheets/profile_form';
import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

export default class SummaryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
    }
  };

  constructor(props) {
    super(props);

    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);

    let careerIds = game.personalityCareers.map((obj) => obj.value) || [];
    let userCareers = currentGroup.careers.filter((item, pos) => { return careerIds.includes(item.code) }) || [];

    this.state = {
      userCareers: userCareers,
      currentGroup: currentGroup,
      user: user,
      game: game,
      confirmDialogVisible: false,
      mostFavorableJob: game.mostFavorableJobCode,
    }
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);

      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })], 1)
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this._closeDialog();
    });
  }

  _buildData(step) {
    let obj =  {
      uuid: this.state.game.uuid,
      mostFavorableJobCode: this.state.mostFavorableJob || null,
      goalCareer: this.state.mostFavorableJob && this.state.currentGroup.careers.find((obj) => obj.code == this.state.mostFavorableJob).name || null,
      step: step || 'RecommendationScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(jobs) {
    return jobs.map(job => {return {value: job.code, label: job.name}});
  }

  _goNext() {
    if (!this.state.mostFavorableJob) {
      return this.refs.toast.show('សូូមជ្រើសរើសមុខរបរចំនួន 1!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('RecommendationScreen'), true);
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderRadioGroups() {
    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>ចូរជ្រើសរើស មុខរបរតែមួយគត់ដែលអ្នកពេញចិត្តបំផុត</Text>
          <RadioButtonGroup
            radio_props={this._formatDataForCheckbox(this.state.userCareers)}
            onPress={(text) => this.setState({ mostFavorableJob: text })}
            value={this.state.mostFavorableJob} >
          </RadioButtonGroup>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
              <Text style={{flex: 1}}>ចូរប្អូនជ្រើសរើស មុខរបរ ឬការងារ ១ដែលប្អូនចូលចិត្តបំផុត ដើម្បីដាក់គោលដៅ និងផែនការអនាគត!</Text>
            </View>

            { this._renderRadioGroups() }
          </View>
        </ScrollView>

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS === 'ios' ? 120 : 140 }/>
      </View>
    );
  };
}
