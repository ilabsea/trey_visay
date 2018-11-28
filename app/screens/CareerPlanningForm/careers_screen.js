import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';

import { Divider } from 'react-native-elements';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import Images from '../../assets/images';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import careerList from '../../data/json/characteristic_jobs';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import CloseButton from '../../components/close_button';


import realm from '../../schema';
import User from '../../utils/user';

export default class CareersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogVisible: false,
      game: null
    }
  }

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];
    this.setState({game : game});
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._backHandler();
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

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <MaterialIcon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this.props.navigation.navigate('SubjectScreen');
  }

  _onYes() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this._onYes();
    });
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', padding: 16}}
          onPress={() => {this.props.navigation.navigate('CareerDetailScreen',{careerId: career.id})}}
        >
          <Image source={Images[career.logoName]} style={{width: 80, height: 80, marginRight: 16}} />
          <Text style={[styles.subTitle, {flex: 1}]}>{career.career_title}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }

  _renderContent() {
    return (
      <View style={[styles.box, {padding: 0}]}>
        { careerList.slice(0, 3).map((career, i) => {
          { return (this._renderCareer(career, i))}
        })}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            { this._renderContent() }
          </View>

        </ScrollView>
        { this._renderFooter() }

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    );
  };
}
